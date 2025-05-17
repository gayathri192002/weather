const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "6a87b4f722950588f1dad1f01e77c30c";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Failed to fetch weather data.");
        }
    } else {
        displayError("Please enter a city.");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("City not found");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name, main, weather } = data;
    const weatherId = weather[0].id;
    const emoji = getWeatherEmoji(weatherId);

    card.innerHTML = `
        <h2>${name}</h2>
        <p>${emoji} ${weather[0].description}</p>
        <p>🌡️ Temp: ${main.temp}°C</p>
    `;
    card.style.display = "flex";
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    if (weatherId >= 300 && weatherId < 500) return "🌧️";
    if (weatherId >= 500 && weatherId < 600) return "🌦️";
    if (weatherId >= 600 && weatherId < 700) return "❄️";
    if (weatherId >= 700 && weatherId < 800) return "🌫️";
    if (weatherId === 800) return "☀️";
    if (weatherId > 800) return "☁️";
    return "🌈";
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
