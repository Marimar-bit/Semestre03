const inputBox = document.getElementById('input-box');
const searchBtn = document.getElementById('search-btn');
const weatherIcon = document.getElementById('weather-icon');
const weather = document.getElementById('weather');
const errorMesage = document.getElementById('error-message');

async function checkWeather(city) {
    const apiKey = '18d4470038ac1d400e93e35050149451';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    updateWeatherUI(data);

}

function updateWeatherUI(data) {
    document.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed} km/h`;

    const weatherIcons = {
        Clear: 'images/clear.png',
        Snow: 'images/snow.png',
        Clouds: 'images/clouds.png',
        Rain: 'images/rain.png',
        //Drizzle: 'images/drizzle.png',
        //Mist: 'images/mist.png'
    };

    weather.src = weatherIcons[data.weather[0].main] || 'images/default.png';

    weather.style.display = 'block';




















/*     if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'images/clouds.png';
    } else if (data.weather[0].main == 'Clear') {
        weatherIcon.src = 'images/clear.png';
    } else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = 'images/rain.png';
    } else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = 'images/drizzle.png';
    } else if (data.weather[0].main == 'Mist') {
        weatherIcon.src = 'images/mist.png';
    } */

}

















searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
})