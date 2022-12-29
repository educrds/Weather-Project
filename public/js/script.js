import { apiKey, requestOptions } from '../../assets/setupApi.js';

// Search Elements
const stateDropdown = document.getElementById('state-dropdown');
const cityDropdown = document.getElementById('city-dropdown');
const buttonSearch = document.getElementById('search-button');
const cityNavBar = document.getElementById('cityNavBar');
const flag = document.getElementById('flag');
// Weather Infos
const elements = document.getElementById('allElements');
const cityName = document.getElementById('city-name');
const weatherImg = document.getElementById('weatherImg');
const weatherTemp = document.getElementById('temp');
const weatherMin = document.getElementById('tempMin');
const weatherMax = document.getElementById('tempMax');
const weatherHumidity = document.getElementById('humidity');
const weatherWindSpeed = document.getElementById('windSpeed');
const dayText = document.getElementById('day-info');
const weatherDescription = document.getElementById('weather-info-tag');
// Theme Button
const themeButton = document.getElementById('toggle');

// Country API Url
const countryApiURL = 'https://api.countrystatecity.in/v1/countries/BR/states';

// Events
themeButton.addEventListener('click', changeTheme);
buttonSearch.addEventListener('click', searchWeather);
stateDropdown.addEventListener('change', handleStateChange);

// Week Day First Letter
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Timestamps
const date = new Date();
const day = date.toLocaleDateString('pt-br', {
  weekday: 'long',
});
const hour = date.getHours();

// fetching API data
const getResponse = async (url, next) => {
  const response = await fetch(url, requestOptions);
  !response.ok && console.log(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  next(data);
};

stateDropdown.style.display = 'none';
stateDropdown.previousElementSibling.style.display = 'block';

// Populate state dropdown
getResponse(countryApiURL, (data) => {
  const states = data.map(({ iso2, name }) => {
    return `<option id="${iso2}">${name}</option>`;
  });
  const statesList = states.join('<option disabled selected hidden>Estado</option>');
  stateDropdown.innerHTML = statesList;

  stateDropdown.previousElementSibling.style.display = 'none';
  stateDropdown.style.display = 'block';
});

function handleStateChange() {
  const defaultOption = document.createElement('option');
  defaultOption.text = 'Cidade';

  const stateISO = stateDropdown.options[stateDropdown.selectedIndex].id;
  const cityAPI = `https://api.countrystatecity.in/v1/countries/BR/states/${stateISO}/cities`;

  cityDropdown.length = 0;
  cityDropdown.add(defaultOption);
  cityDropdown.selectedIndex = 0;
  cityDropdown.style.display = 'none';

  cityDropdown.previousElementSibling.style.display = 'block';

  // Populate cities dropdown
  getResponse(cityAPI, (data) => {
    const cities = data.map(({ name }) => {
      return `<option id="${name}">${name}</option>`;
    });
    const citiesList = cities.join(
      '<option disabled selected hidden>Cidade</option>'
    );
    cityDropdown.innerHTML = citiesList;
    cityDropdown.previousElementSibling.style.display = 'none';
    cityDropdown.style.display = 'block';
  });
}

// Fetch Weather by City
function searchWeather() {
  const city = cityDropdown.options[cityDropdown.selectedIndex].text;
  const iso = stateDropdown.options[stateDropdown.selectedIndex].id;

  const stateName = stateDropdown.options[stateDropdown.selectedIndex].text;
  const stateFlagName = stateName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

  dayText.innerHTML = `${capitalizeFirstLetter(day)}, ${hour}h.`;
  cityNavBar.textContent = `${city}-${iso}`;
  cityName.textContent = `${city}, ${iso}`;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  )
    .then((res) => res.json())
    .then((data) => handleWeather(data))
    .catch(() => (window.location.href = '404.html'));

  flag.src = `public/imgs/state-flags/${stateFlagName}.svg`;
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

  // Insert values
  weatherImg.src = `public/imgs/weather-icons/${icon}.svg`;
  weatherDescription.textContent = capitalizeFirstLetter(description);
  weatherTemp.textContent = `${tempValue}°`;
  weatherMin.textContent = `${tempMin}°`;
  weatherMax.textContent = `${tempMax}°`;
  weatherHumidity.textContent = `${humidityValue}%`;
  weatherWindSpeed.textContent = `${Math.imul(speed, 3.6)} km/h`;

  elements.style.display = 'block';
}

// Change Theme Mode
function changeTheme() {
  document.documentElement.classList.toggle('dark-mode');
}
