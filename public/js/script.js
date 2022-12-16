import { apiKey, requestOptions } from '../../assets/setupApi.js';

// Search Elements
const stateDropdown = document.getElementById('state-dropdown');
const cityDropdown = document.getElementById('city-dropdown');
const buttonSearch = document.getElementById('search-button');
const cityNavBar = document.getElementById('cityNavBar');
const cityText = document.getElementById('city');

// Weather Infos
const elements = document.getElementById('allElements');
const weatherDescription = document.getElementById('description');
const weatherImg = document.getElementById('weatherImg');
const weatherTemp = document.getElementById('temp');
const weatherMin = document.getElementById('tempMin');
const weatherMax = document.getElementById('tempMax');
const weatherHumidity = document.getElementById('humidity');
const weatherWindSpeed = document.getElementById('windSpeed');
const weekDayText = document.getElementById('weekDay');

// Theme Button
const themeButton = document.getElementById('toggle');

// Country API Url
const countryApiURL = 'https://api.countrystatecity.in/v1/countries/BR/states';

// Week Day First Letter
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const day = new Date().toLocaleDateString('pt-br', {
  weekday: 'long',
});

// Events
themeButton.addEventListener('click', changeTheme);
buttonSearch.addEventListener('click', searchWeather);
stateDropdown.addEventListener('change', handleCityChange);

// Populate STATES
fetch(countryApiURL, requestOptions)
  .then((response) => response.json())
  .then((result) => populateStates(result))
  .catch((error) => console.log(error));

function populateStates(list) {
  const states = list.map(({ iso2, name }) => {
    return `<option id="${iso2}">${name}</option>`;
  });
  const statesList = states.join('<option disabled selected hidden>Estado</option>');
  stateDropdown.innerHTML = statesList;
}

// Populate CITIES
function handleCityChange() {
  const defaultOption = document.createElement('option');
  defaultOption.text = 'Cidade';

  const iso = stateDropdown.options[stateDropdown.selectedIndex].id;

  cityDropdown.length = 0;
  cityDropdown.add(defaultOption);
  cityDropdown.selectedIndex = 0;

  fetch(
    `https://api.countrystatecity.in/v1/countries/BR/states/${iso}/cities`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => populateCities(result))
    .catch((error) => console.log(error));
}

function populateCities(list) {
  const cities = list.map(({ name }) => {
    return `<option id="${name}">${name}</option>`;
  });
  const citiesList = cities.join('<option disabled selected hidden>Estado</option>');
  cityDropdown.innerHTML = citiesList;
}

// Fetch Weather by City
function searchWeather() {
  const city = cityDropdown.options[cityDropdown.selectedIndex].text;
  const iso = stateDropdown.options[stateDropdown.selectedIndex].id;

  weekDayText.innerHTML = capitalizeFirstLetter(day);
  cityNavBar.textContent = `${city}-${iso}`;
  cityText.textContent = city;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  )
    .then((res) => res.json())
    .then((data) => handleWeather(data))
    .catch(() => (window.location.href = '404.html'));
}

function handleWeather(data) {
  const { description, icon } = data.weather[0];
  const { temp, temp_min, temp_max, humidity } = data.main;
  const { speed } = data.wind;

  // Round Values
  const tempValue = Math.round(temp);
  const tempMin = Math.round(temp_min);
  const tempMax = Math.round(temp_max);
  const humidityValue = Math.round(humidity);

  weatherImg.src = `public/imgs/${icon}.svg`;
  weatherDescription.textContent = `${description} em`;
  weatherTemp.textContent = tempValue;
  weatherMin.textContent = tempMin;
  weatherMax.textContent = tempMax;
  weatherHumidity.textContent = humidityValue;
  weatherWindSpeed.textContent = Math.imul(speed, 3.6);

  elements.style.display = 'block';
}

// Change Theme Mode
function changeTheme() {
  document.documentElement.classList.toggle('dark-mode');
}
