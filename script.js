const API_KEY = 'd80a1259b67742f9dc6b86a1aa76e315'; // Replace with your Weatherstack API key

// Getting all the data elements
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');





// Declaring arrays for months and days
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Function to update time and date
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour > 12 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = 
        `${hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat}:${minutes < 10 ? '0' + minutes : minutes} <span id="am-pm">${ampm}</span>`;

    dateEl.innerHTML = `${days[day]}, ${date} ${months[month]}`;

}, 1000);

// Getting weather data using Weatherstack API
async function getWeatherData() {
    // Test with static coordinates (e.g., coordinates for New York)
    const latitude = 40.7831;
    const longitude = -73.9712;
    const url = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}`;
    const options = {
        method: "GET",
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        showWeatherData(data);
    } catch (error) {
        alert('Failed to retrieve weather data: ' + error.message);
        console.error(error);
    }
}

// Function to display weather data from Weatherstack
function showWeatherData(data) {
    const { current } = data;
    const { humidity, pressure, wind_speed } = current;
    const sunrise = new Date(current.observation_time).getTime() / 1000; // Placeholder
    const sunset = sunrise; // Placeholder

    timezone.innerHTML = current.timezone_id;
    countryEl.innerHTML = `Lat: ${data.location.lat}°N, Lon: ${data.location.lon}°E`;

    currentWeatherItemsEl.innerHTML = `
        <div class="weather-item">
            <div>Humidity</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${pressure} hPa</div>
        </div>
        <div class="weather-item">
            <div>Wind Speed</div>
            <div>${wind_speed} km/h</div>
        </div>
        <div class="weather-item">
            <div>Sunrise</div>
            <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
            <div>Sunset</div>
            <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
        </div>
    `;

    currentTempEl.innerHTML = `
        <img src="${current.weather_icons[0]}" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">${window.moment().format('dddd')}</div>
            <div class="temp">Temperature - ${current.temperature}&#176;C</div>
        </div>
    `;
}

// Call getWeatherData to fetch and display the weather data
getWeatherData();
