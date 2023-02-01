import React, { useEffect, useState } from 'react';
import { Container, Button, Select } from './style';
import { BiSearch } from 'react-icons/bi';
import fetchData from '../../services/api';
import { geo, weather } from '../../services/configApi';

const Dropdowns = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchData('/', geo).then(data => setStates(data));
  }, []);

  const handleStateChange = e => {
    setCities([]);
    const stateISO = e.target.options[e.target.selectedIndex].id;
    fetchData(`/${stateISO}/cities`, geo).then(data => setCities(data));
  };

  const handleCityChange = e => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    fetchData(`weather?q=${selectedCity}&appid=${apiKey}&units=metric&lang=pt_br`, weather).then(
      data => console.log(data)
    );
  };

  return (
    <Container>
      <Dropdown onChange={handleStateChange} label='Estado' data={states} />
      <Dropdown onChange={handleCityChange} label='Cidade' data={cities} />
      <SearchButton onClick={handleSubmit} />
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

const SearchButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <BiSearch />
    </Button>
  );
};
export default Dropdowns;
