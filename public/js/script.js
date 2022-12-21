import { apiKey, requestOptions } from '../../assets/setupApi.js';

// Search Elements
const stateDropdown = document.getElementById('state-dropdown');
const cityDropdown = document.getElementById('city-dropdown');
const buttonSearch = document.getElementById('search-button');
const cityNavBar = document.getElementById('cityNavBar');
const spinnerLoad = document.querySelector('.spinner-border');
const flag = document.getElementById('flag');

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

// fetching API data
const getResponse = async (url, next) => {
  const response = await fetch(url, requestOptions);
  !response.ok && console.log(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  next(data);
};

// Populate state dropdown
getResponse(countryApiURL, (data) => {
  const states = data.map(({ iso2, name }) => {
    return `<option id="${iso2}">${name}</option>`;
  });
  const statesList = states.join('<option disabled selected hidden>Estado</option>');
  stateDropdown.innerHTML = statesList;
});

function handleCityChange() {
  const defaultOption = document.createElement('option');
  defaultOption.text = 'Cidade';

  const stateISO = stateDropdown.options[stateDropdown.selectedIndex].id;
  const cityAPI = `https://api.countrystatecity.in/v1/countries/BR/states/${stateISO}/cities`;

  cityDropdown.length = 0;
  cityDropdown.add(defaultOption);
  cityDropdown.selectedIndex = 0;
  cityDropdown.style.display = 'none';
  
  spinnerLoad.style.display = 'block';

  // Populate cities dropdown
  getResponse(cityAPI, (data) => {
    const cities = data.map(({ name }) => {
      return `<option id="${name}">${name}</option>`;
    });
    const citiesList = cities.join(
      '<option disabled selected hidden>Cidade</option>'
    );
    cityDropdown.innerHTML = citiesList;
    spinnerLoad.style.display = 'none';
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

  weekDayText.innerHTML = capitalizeFirstLetter(day);
  cityNavBar.textContent = `${city}-${iso}`;

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
  weatherDescription.textContent = `${capitalizeFirstLetter(description)} em ${
    data.name
  }.`;
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
