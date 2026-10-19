# Experiment 1: GitHub Repository, Branching, Merging, and GitHub Pages

## Aim

Set up a GitHub repository for a project, create branches, merge changes, and learn how GitHub Pages can host a simple static website.

## Tools and technologies used

- HTML5
- CSS3
- Git and GitHub
- GitHub Pages

## Basic description of the implementation

The project is a small responsive static webpage with a heading, description, navigation links, and content sections. Its HTML and CSS are kept in separate files. The README describes how to create a repository, commit changes, branch, merge, and configure GitHub Pages. No account is accessed and nothing is published automatically.

## Main concepts used

- Static web pages and relative file links
- Git repositories, commits, branches, and merges
- Hosting static content with GitHub Pages
- Responsive CSS and accessible navigation

## Steps to run the project

1. Open `index.html` in a web browser.
2. To practise Git, open a terminal in the project folder:

```bash
git init
git add .
git commit -m "Create the static lab page"
git switch -c update-page
```

3. Edit a file, then stage and commit the change:

```bash
git add .
git commit -m "Update the page"
```

4. Merge the branch into the main branch:

```bash
git switch main
git merge update-page
```

5. To publish manually, push the repository to GitHub and choose **Settings > Pages**, then select the `main` branch and root folder. GitHub Pages provides the published URL after deployment.

## Expected output

A simple page titled “My Web Designing Lab” appears with working navigation links to its sections. It adjusts to narrow screens without horizontal scrolling.
