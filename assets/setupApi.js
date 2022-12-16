//  Setup API Header
const apiKey = 'd63bfabd0c861ed3e5d836ba9c75e4ba';

const headers = new Headers();
headers.append(
  'X-CSCAPI-KEY',
  'dWRXTUFMcGFveUg5U1llZGE3VUxQZTNadjJnczlUMTNMaG5YSnVyeQ=='
);

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};

export { apiKey, requestOptions };
