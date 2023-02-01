import React, { useEffect } from 'react';
import { Container, SearchButton, Select } from './style';
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import { geoData, weatherData } from '../../services/api';

const Dropdowns = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    geoData('/').then(data => setStates(data));
  }, []);

  const handleStateChange = e => {
    setCities([]);
    const stateISO = e.target.options[e.target.selectedIndex].id;
    geoData(`/${stateISO}/cities`).then(data => setCities(data));
  };

  const handleCityChange = e => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('click');
    const apiKey = 'd63bfabd0c861ed3e5d836ba9c75e4ba';
    weatherData(`weather?q=${selectedCity}&appid=${apiKey}&units=metric&lang=pt_br`).then(data =>
      console.log(data)
    );
  };

  return (
    <Container>
      <Dropdown onChange={handleStateChange} label='Estado' data={states} />
      <Dropdown onChange={handleCityChange} label='Cidade' data={cities} />
      <SearchButton onClick={handleSubmit}>
        <BiSearch />
      </SearchButton>
    </Container>
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
export default Dropdowns;
