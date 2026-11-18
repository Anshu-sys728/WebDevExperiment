const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 3002;
const feedbackEntries = [];

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "dynamic-feedback-app" });
});

app.get("/api/feedback", (req, res) => {
    res.json(feedbackEntries);
});

app.post("/api/feedback", (req, res) => {
    const body = req.body || {};
    if (typeof body.name !== "string" || typeof body.feedback !== "string") {
        return res.status(400).json({ error: "Enter your name and feedback." });
    }

    const name = body.name.trim();
    const feedback = body.feedback.trim();
    if (!name || name.length > 100 || !feedback || feedback.length > 1000) {
        return res.status(400).json({ error: "Name and feedback are required and must be within the allowed length." });
    }

    const entry = {
        id: feedbackEntries.length + 1,
        name,
        feedback,
        createdAt: new Date().toISOString(),
    };
    feedbackEntries.push(entry);

    res.status(201).json({
        message: "Thank you! Your feedback was received.",
        feedback: entry,
    });
});

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
    res.status(500).json({ error: "Something went wrong. Check the server logs for details." });
});

app.listen(port, () => {
    console.log(`Experiment 10 dynamic app is running on port ${port}`);
});
