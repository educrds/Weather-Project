import axios from 'axios';

const geo = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1/countries/BR/states',
  headers: {
    'X-CSCAPI-KEY': 'dWRXTUFMcGFveUg5U1llZGE3VUxQZTNadjJnczlUMTNMaG5YSnVyeQ==',
  },
});

const weather = axios.create({
  // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export { geo, weather };
