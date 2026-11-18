# Experiment 11: Website Optimization

A simple, responsive static website demonstrating browser caching, minified CSS and JavaScript, and lazy-loaded images.

## Optimizations

- `_headers` asks Netlify to revalidate the page while caching the versioned CSS and JavaScript files for one year. Change an asset's contents by giving it a new versioned filename and updating `index.html`.
- `style.v1.min.css` and `script.v1.min.js` are the compact production assets used by the page.
- Each gallery image has `loading="lazy"` and `decoding="async"`. Its dimensions are specified to reserve space before it loads.

## View locally

Open `index.html` in a browser. The browser applies the image lazy-loading behavior; HTTP cache headers are applied when the folder is served by a host that supports the `_headers` file, such as Netlify.

## Deploy with Netlify

The repository's current root `netlify.toml` publishes `Experiment-10/static-site`. To deploy this experiment without changing that site, create a separate Netlify site for the same repository and configure its base/publish directory as `Experiment-11`. The `_headers` file must be in the published directory for the cache rules to apply. The page also links to the [GitHub repository](https://github.com/Anshu-sys728/WebDevExperiment).
