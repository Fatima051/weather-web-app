const apiKey = 'fcae99916c81566b42276009eaa95b82';

document.getElementById('get-weather-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert("Please enter a location.");
    }
});

document.getElementById('get-location-weather-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, error => {
            alert("Error getting your location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Weather data not found for location: ${location}`);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            alert("Error: " + error.message);
            console.error(error);
        });
}

function fetchWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found for your location.');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            alert("Error: " + error.message);
            console.error(error);
        });
}

function displayWeather(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('conditions').innerText = `Conditions: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}
