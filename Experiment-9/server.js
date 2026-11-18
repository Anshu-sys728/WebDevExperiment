require("dotenv").config();

const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const express = require("express");
const rateLimit = require("express-rate-limit").rateLimit;
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 3001;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/experiment9_auth";
const jwtSecret = process.env.JWT_SECRET;
const cookieName = "auth_token";
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
};

if (!jwtSecret || Buffer.byteLength(jwtSecret) < 32) {
    console.error("Set JWT_SECRET in your .env file to a random value of at least 32 characters.");
    process.exit(1);
}

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 254,
    },
    passwordHash: {
        type: String,
        required: true,
        select: false,
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many login attempts. Please try again later." },
});

function asyncHandler(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}

function validEmail(email) {
    return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setLoginCookie(res, user) {
    const token = jwt.sign(
        { sub: user._id.toString() },
        jwtSecret,
        { expiresIn: "1h", issuer: "experiment-9" }
    );

    res.cookie(cookieName, token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000,
    });

    return {
        id: user._id.toString(),
        email: user.email,
    };
}

function authenticate(req, res, next) {
    const token = req.cookies[cookieName];
    if (!token) {
        return res.status(401).json({ error: "Please log in to continue." });
    }

    let payload;
    try {
        payload = jwt.verify(token, jwtSecret, { issuer: "experiment-9" });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.clearCookie(cookieName, cookieOptions);
            return res.status(401).json({ error: "Your session has expired. Please log in again." });
        }
        return next(error);
    }

    if (!payload || typeof payload === "string" || typeof payload.sub !== "string") {
        res.clearCookie(cookieName, cookieOptions);
        return res.status(401).json({ error: "Invalid session. Please log in again." });
    }

    User.findById(payload.sub)
        .select("_id email")
        .then((user) => {
            if (!user) {
                res.clearCookie(cookieName, cookieOptions);
                return res.status(401).json({ error: "Account not found. Please log in again." });
            }
            req.user = user;
            next();
        })
        .catch(next);
}

const authRoutes = express.Router();

authRoutes.post("/register", asyncHandler(async (req, res) => {
    const body = req.body || {};
    if (typeof body.email !== "string" || typeof body.password !== "string") {
        return res.status(400).json({ error: "Enter an email address and password." });
    }

    const email = body.email.trim().toLowerCase();
    const password = body.password;
    if (!validEmail(email)) {
        return res.status(400).json({ error: "Enter a valid email address." });
    }
    if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
        return res.status(400).json({ error: "Password must be at least 8 characters and no more than 72 bytes." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    let user;
    try {
        user = await User.create({ email, passwordHash });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "An account with this email already exists." });
        }
        throw error;
    }

    res.status(201).json({ user: setLoginCookie(res, user) });
}));

authRoutes.post("/login", loginLimiter, asyncHandler(async (req, res) => {
    const body = req.body || {};
    if (typeof body.email !== "string" || typeof body.password !== "string") {
        return res.status(400).json({ error: "Enter an email address and password." });
    }

    const email = body.email.trim().toLowerCase();
    if (!validEmail(email)) {
        return res.status(400).json({ error: "Enter a valid email address." });
    }

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !await bcrypt.compare(body.password, user.passwordHash)) {
        return res.status(401).json({ error: "Email or password is incorrect." });
    }

    res.json({ user: setLoginCookie(res, user) });
}));

authRoutes.post("/logout", (req, res) => {
    res.clearCookie(cookieName, cookieOptions);
    res.json({ message: "You are logged out." });
});

authRoutes.get("/me", authenticate, (req, res) => {
    res.json({
        user: {
            id: req.user._id.toString(),
            email: req.user.email,
        },
    });
});

app.use("/api/auth", authRoutes);
app.use("/api", (req, res) => {
    res.status(404).json({ error: "API route not found." });
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({ error: "Request body must be valid JSON." });
    }
    console.error(error);
    res.status(500).json({ error: "Something went wrong. Check the server terminal for details." });
});

mongoose.connect(mongoUri)
    .then(() => {
        app.listen(port, () => {
            console.log(`Experiment 9 is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Could not connect to MongoDB:", error.message);
        process.exit(1);
    });
