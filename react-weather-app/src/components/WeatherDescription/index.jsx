import { useState } from 'react';
import {
  TextContainer,
  Title,
  Tag,
  SmallTitle,
  WeatherSquare,
  Temperature,
  TemperatureContainer,
  WeatherContainer,
  Row,
} from './style';
import { TbTemperatureCelsius, TbTemperatureMinus, TbTemperaturePlus } from 'react-icons/tb';

import { WiHumidity, WiWindy } from 'react-icons/wi';

const Weather = () => {
  const [description, setDescription] = useState({
    day: '',
    hour: '',
    city: '',
    weatherDescription: '',
  });

  return (
    <>
      <TextContainer>
        <SmallTitle>Quinta-feira, 9h</SmallTitle>
        <Title>Brasília-DF</Title>
        <Tag>
          <SmallTitle>Céu limpo</SmallTitle>
        </Tag>
        <img src='src/assets/imgs/weather-icons/01d.svg' alt='' />
      </TextContainer>
      <WeatherContainer>
        <WeatherSquare>
          <Title>
            25 <TbTemperatureCelsius />
          </Title>
          <Row>
            <TemperatureInfo icon={<TbTemperatureMinus />} label='Mín.' value='20' celsius />
            <TemperatureInfo icon={<TbTemperaturePlus />} label='Max.' value='20' celsius />
          </Row>
        </WeatherSquare>
        <WeatherSquare>
          <Row className='column'>
            <TemperatureInfo icon={<WiWindy />} label='Vento.' value='20 km/h' />
            <TemperatureInfo icon={<WiHumidity />} label='Umidade' value='55%' />
          </Row>
        </WeatherSquare>
      </WeatherContainer>
    </>
  );
};

const TemperatureInfo = ({ icon, label, value, celsius }) => {
  return (
    <TemperatureContainer>
      <Temperature>{icon}</Temperature>
      <div>
        <SmallTitle>{label}</SmallTitle>
        <p>
          {value}
          {celsius && <TbTemperatureCelsius />}
        </p>
      </div>
    </TemperatureContainer>
  );
};

export default Weather;
