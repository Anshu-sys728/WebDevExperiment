# Experiment 1: GitHub and GitHub Pages

## Aim

Create a simple personal homepage and practise using a GitHub repository, branches, merging, and GitHub Pages.

## Technologies

- HTML5
- CSS3
- Bootstrap 5
- Git and GitHub
- GitHub Pages

## Page contents

The homepage introduces Sweta as a second-year B.Tech Data Science student. The About Me section lists project names and links to the GitHub repository.

## Basic Git workflow

Create a branch, commit a change, and push the branch:

```bash
git switch -c update-homepage
git add .
git commit -m "Update homepage"
git push -u origin update-homepage
```

After reviewing the change, merge it into `main`:

```bash
git switch main
git pull origin main
git merge update-homepage
git push origin main
```

## Publish with GitHub Pages

1. Push the finished project to the `main` branch on GitHub.
2. In the repository, open **Settings > Pages**.
3. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.
4. When deployment finishes, open the Pages URL and add `/Experiment-1/` to view this page in its folder.

The Pages site must be enabled in repository settings before it can be viewed online.

## Preview locally

Open `index.html` in a web browser. An internet connection is needed to load Bootstrap from its CDN.
