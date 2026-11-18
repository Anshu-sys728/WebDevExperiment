# Web Designing Lab

A beginner-friendly collection of ten web designing experiments built with HTML, CSS, Bootstrap, JavaScript, React, and Node.js. Each experiment is a separate folder.

## Experiments

1. [GitHub Repository, Branching, Merging, and GitHub Pages](./Experiment-1/README.md)
2. [Personal Portfolio Website](./Experiment-2/README.md)
3. [Dynamic To-Do List](./Experiment-3/README.md)
4. [SEO and Accessibility](./Experiment-4/README.md)
5. [Weather Application Using Fetch API](./Experiment-5/README.md)
6. [Responsive Blog Website Using Bootstrap and Media Queries](./Experiment-6/README.md)
7. [Notes App Using React](./Experiment-7/README.md)
8. [Book Collection API Using Node.js and Express](./Experiment-8/README.md)
9. [User Authentication Using Node.js and Express](./Experiment-9/README.md)
10. [Deploy Static and Dynamic Websites](./Experiment-10/README.md)

## Technologies used

- HTML5 for page structure
- CSS3 for styling and responsive layouts
- Bootstrap 5 CDN for basic layout and components in Experiments 2 and 6
- JavaScript and the Fetch API in Experiments 3 and 5
- Open-Meteo Geocoding and Forecast APIs in Experiment 5 (no API key required)
- React and Babel Standalone from their CDNs in Experiment 7
- Node.js and Express.js in Experiments 8 and 9
- Netlify and AWS Elastic Beanstalk deployment configuration in Experiment 10

## Open the project in VS Code

1. Open Visual Studio Code.
2. Select **File > Open Folder...**.
3. Choose the `Web-Designing-Lab` project folder.
4. In the Explorer panel, open an experiment folder and edit its files.

## Run an experiment

Most experiments can be opened in a browser without a build step. Experiments 2 and 6 load Bootstrap from its CDN, and Experiment 7 loads React and Babel from CDNs, so they need an internet connection. Experiment 5 also needs an internet connection to contact the Open-Meteo APIs. Experiments 8 and 9 are Node.js applications; see their READMEs for how to install and start them. Experiment 10 contains the deployment setup and instructions; live cloud deployments require hosting accounts.

## GitHub repository and GitHub Pages

To publish the project yourself, create a repository on GitHub, then run these commands from the project folder after replacing the example URL with your own repository URL:

```bash
git init
git add .
git commit -m "Add Web Designing Lab experiments"
git branch -M main
git remote add origin https://github.com/your-username/your-repository.git
git push -u origin main
```

Create a feature branch to work separately, commit your changes, and merge it into `main` when ready:

```bash
git switch -c add-experiment
git add .
git commit -m "Add experiment"
git switch main
git merge add-experiment
git push
```

To host a static page, open the repository's **Settings > Pages**, select the `main` branch and the root folder as the publishing source, and save. GitHub Pages will provide a site URL after deployment. For an experiment stored in a subfolder, open its `index.html` through the matching subfolder path in the published site. This project does not access a GitHub account or publish anything automatically.
