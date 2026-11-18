# Experiment 10: Deploy Static and Dynamic Websites

## Objective

Prepare the lab portfolio for static hosting on Netlify and the Experiment-9 authentication app for dynamic hosting on AWS Elastic Beanstalk.

## Deployment status

The repository includes the Netlify configuration and deployment instructions. Neither website has been deployed yet: Netlify, AWS, and MongoDB Atlas accounts are not configured. No cloud resources have been created. Continue only if the selected plans and resources remain within your free-tier limit.

## Static website: Netlify

The static website is the portfolio at the repository root (`index.html`, `style.css`, and `assets/`). The root `netlify.toml` sets the publish directory to `.`; there is no build command.

1. Sign in to Netlify and choose **Add new site > Import an existing project**.
2. Connect GitHub and select `Anshu-sys728/WebDevExperiment`.
3. Use the `main` branch. Confirm the publish directory is `.` and leave the build command empty.
4. Deploy the site and open the Netlify URL to check the portfolio and its project links.

Netlify will redeploy when new commits are pushed to the connected branch.

## Dynamic website: AWS Elastic Beanstalk

The dynamic website is [Experiment 9](../Experiment-9/README.md), a Node.js and Express authentication app backed by MongoDB. Its server reads `PORT`, `MONGODB_URI`, and `JWT_SECRET` from the environment. `.ebignore` excludes local environment files and installed dependencies from deployment packages.

### Prerequisites

- An AWS account and AWS CLI/Elastic Beanstalk CLI configured for that account.
- A MongoDB Atlas deployment reachable from the AWS application.
- A Node.js runtime compatible with the `engines` setting in `Experiment-9/package.json`.
- Confirmation in the AWS and Atlas pricing pages that the selected resources stay within your free-tier limit. If a cost may apply, stop and get approval before creating resources.

### Deployment outline

1. Create a MongoDB Atlas database user and database. Configure network access for the AWS application without allowing access from every IP address.
2. Create a random JWT secret of at least 32 characters. Keep both the secret and MongoDB connection string private.
3. In the AWS console, create a Node.js Elastic Beanstalk application/environment using the `Experiment-9` folder as the source.
4. Configure these environment properties in Elastic Beanstalk; do not put their values in GitHub:
   - `MONGODB_URI`: the Atlas connection string.
   - `JWT_SECRET`: the generated random secret.
   - `NODE_ENV`: `production`.
5. Deploy the application. Check the environment health and open its HTTPS URL.
6. Test registration, logout, and login. The app requires its MongoDB connection to be available.

Elastic Beanstalk and MongoDB Atlas settings and pricing can change. Review the current console prompts and costs before creating or updating any resources.

## Verification and evidence

After deployment, record the Netlify site URL, the AWS HTTPS URL, and screenshots showing each site working. These values are intentionally left blank until real deployments are completed; no deployment URL or evidence is claimed in this repository yet.
