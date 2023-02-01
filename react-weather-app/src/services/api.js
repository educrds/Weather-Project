import { geo, weather } from './configApi';

const geoData = async (endpoint) => {
  try {
    const { data } = await geo(endpoint);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = async endpoint => {
  try {
    const response = await weather(endpoint);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { geoData, weatherData };
