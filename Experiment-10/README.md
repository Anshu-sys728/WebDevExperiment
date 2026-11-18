# Experiment 10: Static and Dynamic Website Deployment

## Objective

Create a static website for Netlify and a dynamic Node.js feedback app for AWS Elastic Beanstalk.

## Project structure

- `static-site/`: standalone HTML, CSS, and JavaScript website.
- `dynamic-site/`: Node.js and Express feedback app with health and JSON endpoints.

## Deployment status

Both apps are implemented and can be tested locally. Live hosting is still pending because Netlify and AWS accounts are not configured. No cloud resources have been created. Use free-tier resources only and stop if a service may incur charges.

## Run locally

Open `static-site/index.html` in a browser to see the static website.

Run the dynamic app on Windows:

```powershell
cd Experiment-10\dynamic-site
npm.cmd install
npm.cmd start
```

Open `http://localhost:3002`. Submit feedback, then use **Check Server Health** and **View Submitted Feedback (JSON)** to test the dynamic endpoints. Feedback is held in memory and is cleared when the server restarts.

## Deploy the static website to Netlify

The root `netlify.toml` sets `Experiment-10/static-site` as the publish directory. There is no build command.

1. Sign in to Netlify and choose **Add new site > Import an existing project**.
2. Connect GitHub and select `Anshu-sys728/WebDevExperiment`.
3. Use the `main` branch. Confirm the publish directory is `Experiment-10/static-site` and leave the build command empty.
4. Deploy the site and open the Netlify URL to test the button.

Netlify can redeploy when new commits are pushed to the connected branch.

## Deploy the dynamic app to AWS Elastic Beanstalk

The source for the dynamic site is `dynamic-site/`. Its `Procfile` starts the app with `npm start`, and `.ebignore` excludes local environment files and installed dependencies.

1. Sign in to AWS and check the current pricing/free-tier terms before creating any resources. Do not continue if a charge may apply.
2. Create an Elastic Beanstalk Node.js application/environment using the contents of `Experiment-10/dynamic-site` as the source. Use a supported Node.js platform.
3. Deploy the application. Open the environment's HTTPS URL.
4. Submit a feedback entry and verify the success message. Open `/api/health` and `/api/feedback` to verify the JSON responses.

The feedback app stores entries in memory, so they do not persist across app restarts or multiple instances. A database would be needed for persistent storage.

## Evidence

After deployment, add the Netlify and AWS URLs and screenshots of both working sites here. No live URLs or deployment evidence are claimed until the services have actually been deployed.
