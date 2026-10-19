# Experiment 5: Weather Application Using Fetch API

## Aim

Create a simple weather application that retrieves current conditions for a city from a public API.

## Tools and technologies used

- HTML5
- CSS3
- JavaScript and the Fetch API
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

No API key is required.

## Basic description of the implementation

The user enters a city name. The script first calls the Open-Meteo Geocoding API to find coordinates. It then sends those coordinates to the Forecast API and displays the city, current temperature, relative humidity, and a readable weather condition. The page reports blank input, unknown cities, failed requests, and missing weather data.

## Main concepts used

- JavaScript form events and `async`/`await`
- `fetch()` requests and HTTP response checks
- URL query parameters
- Displaying API results in the DOM
- Handling errors and empty results

## Steps to run the project

1. Open `index.html` in a browser with an internet connection.
2. Enter a city name, such as `London` or `Tokyo`.
3. Select **Search** and wait for the current conditions to appear.

## How the Fetch API works

The browser uses `fetch()` to request JSON from the geocoding service. The first result provides latitude and longitude. A second `fetch()` sends those coordinates to the forecast service. The script checks both HTTP responses, reads the JSON, and adds the weather details to the page. A `try`/`catch` block displays helpful messages if a request fails.

## Expected output

For a recognized city, the page shows its name, temperature in Celsius, humidity percentage, and weather condition. Empty input, an unknown city, or a network/API error produces a visible message instead of a blank result.
