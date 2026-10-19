const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const statusMessage = document.getElementById("status");
const weatherResult = document.getElementById("weatherResult");

// Convert common Open-Meteo weather codes into readable descriptions.
function describeWeather(code) {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code === 45 || code === 48) return "Fog";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code === 85 || code === 86) return "Snow showers";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Weather information unavailable";
}

weatherForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    weatherResult.replaceChildren();

    if (city === "") {
        statusMessage.textContent = "Please enter a city name.";
        cityInput.focus();
        return;
    }

    statusMessage.textContent = "Loading weather...";

    try {
        // First look up the city's latitude and longitude by its name.
        const geocodingUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
        geocodingUrl.search = new URLSearchParams({
            name: city,
            count: "1",
            language: "en",
            format: "json"
        });
        const locationResponse = await fetch(geocodingUrl);
        if (!locationResponse.ok) {
            throw new Error("Could not search for that city. Please try again.");
        }
        const locationData = await locationResponse.json();
        const location = locationData.results && locationData.results[0];

        if (!location) {
            statusMessage.textContent = "City not found. Check the spelling and try again.";
            return;
        }

        // Use the coordinates to ask Open-Meteo for current conditions.
        const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
        forecastUrl.search = new URLSearchParams({
            latitude: String(location.latitude),
            longitude: String(location.longitude),
            current: "temperature_2m,relative_humidity_2m,weather_code"
        });
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error("Could not load weather information. Please try again.");
        }
        const forecastData = await forecastResponse.json();

        if (!forecastData.current) {
            throw new Error("The weather service returned no current conditions.");
        }

        const current = forecastData.current;
        const title = document.createElement("h2");
        const temperature = document.createElement("p");
        const humidity = document.createElement("p");
        const condition = document.createElement("p");

        title.textContent = location.name + (location.country ? ", " + location.country : "");
        temperature.textContent = "Temperature: " + current.temperature_2m + " °C";
        humidity.textContent = "Humidity: " + current.relative_humidity_2m + "%";
        condition.textContent = "Weather: " + describeWeather(current.weather_code);
        weatherResult.append(title, temperature, humidity, condition);
        statusMessage.textContent = "";
    } catch (error) {
        statusMessage.textContent = error instanceof Error
            ? error.message
            : "An unexpected error occurred while loading the weather.";
    }
});
