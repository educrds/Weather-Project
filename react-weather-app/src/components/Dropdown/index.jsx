import React, { useEffect, useState } from 'react';
import { Container, Button, Select, SpinnerContainer, Loading } from './style';
import { BiSearch } from 'react-icons/bi';
import fetchData from '../../services/api';
import { geo, weather } from '../../services/configApi';
import Weather from '../WeatherDescription';

const apiKey = import.meta.env.VITE_API_KEY;

const Dropdowns = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData('/', geo).then(data => setStates(data));
  }, []);

  const handleStateChange = e => {
    const stateISO = e.target.options[e.target.selectedIndex].id;
    setCities([]);
    setIsLoading(true);
    fetchData(`/${stateISO}/cities`, geo).then(data => {
      setCities(data);
      setIsLoading(false);
    });
  };

  const handleCityChange = e => setSelectedCity(e.target.value);

  const handleSubmit = () =>
    fetchData(`weather?q=${selectedCity}&appid=${apiKey}&units=metric&lang=pt_br`, weather).then(
      data => setWeatherData(data)
    );

  return (
    <>
      <Container>
        <Dropdown onChange={handleStateChange} label='Estado' data={states} />
        {isLoading ? <LoadingSpinner /> : <Dropdown onChange={handleCityChange} label='Cidade' data={cities} />}
        <SearchButton onClick={handleSubmit} />
      </Container>
      {weatherData && <Weather weatherData={weatherData} />}
    </>
  );
};

const Dropdown = ({ label, data, onChange }) => {
  return (
    <Select onChange={onChange}>
      <option>{label}</option>
      {data.map(data => (
        <option id={data.iso2} key={data.id} value={data.name}>
          {data.name}
        </option>
      ))}
    </Select>
  );
};

const SearchButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <BiSearch />
    </Button>
  );
};

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Loading></Loading>
    </SpinnerContainer>
  );
};

export default Dropdowns;
