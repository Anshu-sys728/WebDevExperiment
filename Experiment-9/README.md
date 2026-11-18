# Experiment 9: User Authentication

A simple registration and login app using Node.js, Express, MongoDB, and JWT.

## Requirements

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB Atlas connection string

## Setup on Windows

Open a terminal in the `Experiment-9` folder and install the packages:

```powershell
npm.cmd install
```

Copy the example settings to a local `.env` file:

```powershell
Copy-Item .env.example .env
```

Generate a random JWT secret:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated value into the `JWT_SECRET` line in `.env`. Do not share or commit your `.env` file.

The default MongoDB URL is for a local MongoDB server:

```text
mongodb://127.0.0.1:27017/experiment9_auth
```

If you use MongoDB Atlas, replace `MONGODB_URI` in `.env` with your Atlas connection string. Keep database credentials private.

Start the app:

```powershell
npm.cmd start
```

Open [http://localhost:3001](http://localhost:3001). Create an account, log out, and log in again to try the authentication flow.

## Security notes

- Passwords are hashed with bcrypt before they are stored.
- JWTs are stored in an HTTP-only, SameSite=Strict cookie, not in browser local storage.
- Login attempts are rate limited.
- The JWT secret must be supplied through `.env`; there is no hard-coded fallback.
- This is a learning project. Use HTTPS and review your deployment configuration before putting an authentication app on the public internet.
