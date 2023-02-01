import axios from 'axios';
const apiKey = import.meta.env.VITE_GEO_API_KEY;

const geo = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1/countries/BR/states',
  headers: {
    'X-CSCAPI-KEY': apiKey,
  },
});

const weather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export { geo, weather };
