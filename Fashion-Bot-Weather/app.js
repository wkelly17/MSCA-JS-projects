//! Started Wednesday October 28, 2020 10:06AM.  Trying to make a fashion bot decide clothing based upon weather
//Taking a break on Wednesday October 28, 2020 11:35AM

const weatherDetails = document.querySelector('.details-copy');
const weatherBtn = document.querySelector('.getWeatherBtn');
const mainWeather = document.querySelector('.primary-weather-container');
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '7e60ceacfc4e3b2f8d88b4c8ca734b25';
const city = 'Brandon';
const state = 'MS';
const zip = `39047`;
const iconURL = 'http://openweathermap.org/img/wn/10d@2x.png'; //change the 10d code.

async function getWeather(event) {
  let response = await fetch(
    `${baseURL}?zip=${zip}&units=imperial&APPID=7e60ceacfc4e3b2f8d88b4c8ca734b25`
  );
  console.log(response);
  let weather = await response.json(); //for details see https://developer.mozilla.org/en-US/docs/Web/API/Body/json
  console.log(weather);
  return weather;
}

async function displayWeather() {
  let weather = await getWeather(); //even though defined as async above, have to tell it to wait here too.
  mainWeather.innerHTML = `
  <h2 class = "main-weather-title"> The primary weather right now is: ${weather.weather[0].main} <img src = 'http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png'> </h2>
  `;
  weatherDetails.innerHTML = `
  The temperature is currently <span class="temperature-weather">${weather.main.temp} degrees </span>, but it feels like <span class='feels-like'>${weather.main.feels_like} degrees</span>, and the humidity is at <span class='humidity'> ${weather.main.humidity}%.</span> The wind is blowing at <span class='wind-speed'>${weather.wind.speed}MPH</span>:
  `;
  console.dir(weather);
}

weatherBtn.addEventListener('click', displayWeather);
