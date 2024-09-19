// Getting all the data element
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

// Declaring array for months and days
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Updated API_KEY
const API_KEY = 'd80a1259b67742f9dc6b86a1aa76e315';

// Function to get weather data and access current location of user
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`;

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000);

// Getting user location and fetching weather data from Weatherstack
getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        fetch(`https://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}`)
            .then(res => res.json())
            .then(data => {

                console.log(data);
                showWeatherData(data);
            })
    })
}

// Updating current weather data
function showWeatherData(data) {
    let { humidity, pressure, wind_speed, weather_descriptions, weather_icons } = data.current;
    let { timezone_id, country, sunrise, sunset } = data.location;

    timezone.innerHTML = timezone_id;
    countryEl.innerHTML = `${data.location.lat}N ${data.location.lon}E`;

    currentWeatherItemsEl.innerHTML = `
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure} mb</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed} km/h</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${sunrise ? sunrise : 'N/A'}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${sunset ? sunset : 'N/A'}</div>
    </div>
    `;

    // Display current weather and forecast
    currentTempEl.innerHTML = `
    <img src="${weather_icons[0]}" alt="weather icon" class="w-icon">
    <div class="other">
        <div class="day">${days[new Date().getDay()]}</div>
        <div class="temp">${weather_descriptions[0]}</div>
    </div>
    `;
}

