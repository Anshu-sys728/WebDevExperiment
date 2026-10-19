# Web Designing Lab

A beginner-friendly collection of six web designing experiments built with HTML, CSS, Bootstrap, and JavaScript where needed. Each experiment is a separate, self-contained folder.

## Experiments

1. [GitHub Repository, Branching, Merging, and GitHub Pages](./Experiment-1/README.md)
2. [Personal Portfolio Website](./Experiment-2/README.md)
3. [Dynamic To-Do List](./Experiment-3/README.md)
4. [SEO and Accessibility](./Experiment-4/README.md)
5. [Weather Application Using Fetch API](./Experiment-5/README.md)
6. [Responsive Blog Website Using Bootstrap and Media Queries](./Experiment-6/README.md)

## Technologies used

- HTML5 for page structure
- CSS3 for styling and responsive layouts
- Bootstrap 5 CDN for basic layout and components in Experiments 2 and 6
- JavaScript and the Fetch API in Experiments 3 and 5
- Open-Meteo Geocoding and Forecast APIs in Experiment 5 (no API key required)

## Open the project in VS Code

1. Open Visual Studio Code.
2. Select **File > Open Folder...**.
3. Choose the `Web-Designing-Lab` project folder.
4. In the Explorer panel, open an experiment folder and edit its files.

## Run an experiment

No build step is needed. Open the experiment folder and double-click its `index.html` file, or right-click the file in VS Code and choose **Open in Default Browser** if that option is available. Experiments 2 and 6 load Bootstrap from its CDN and need an internet connection. Experiment 5 also needs an internet connection to contact the Open-Meteo APIs. The other experiments work as local static pages.

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
