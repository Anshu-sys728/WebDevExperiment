# Experiment 6: Green Earth — Environment and Society

## Aim

Create a beginner-friendly, responsive blog that introduces environmental topics and the connection between people and nature.

## Technologies used

- HTML5 for the page structure and content
- CSS3 for the green-and-white theme and responsive styling
- Bootstrap 5 CSS from the jsDelivr CDN for the navigation, spacing, cards, and grid
- Unsplash image URLs for the hero and blog card photographs

## Main features

- Dark green navigation with links to Home, Environment, Society, and About
- Environmental hero image with an introductory heading and paragraph
- Three blog cards about environmental protection, plastic pollution, and society
- About This Blog and Categories sections
- Dark green footer that stays at the bottom when the page is short
- Descriptive alternative text for all images

## Bootstrap grid and media queries

Each blog card is placed in a Bootstrap `col-md-4` column inside a `row`. This displays three equal-width cards across on medium and larger screens. Below Bootstrap's medium breakpoint, the columns take the full row width and stack vertically.

The media query in `style.css` adjusts the navigation layout, hero spacing, card image height, and page padding on smaller screens. The card images use the same height and crop consistently with `object-fit: cover`.

## Open the website in a browser

1. Open the `Experiment-6` folder in Visual Studio Code or File Explorer.
2. Open `index.html` in a web browser (or use **Open with Live Server** if available).
3. Keep an internet connection available so Bootstrap and the Unsplash images can load.
4. Resize the browser window to check the desktop, tablet, and mobile layouts.
