import { useState } from 'react';
import {
  TextContainer,
  Title,
  Tag,
  SmallTitle,
  WeatherSquare,
  TemperatureContainer,
  WeatherContainer,
  Row,
} from './style';
import { TbTemperatureCelsius } from 'react-icons/tb';

const Weather = () => {
  const weekDay = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
  });
  const hourDay = new Date().getHours();

  const [description, setDescription] = useState({
    day: '',
    hour: '',
    city: '',
    weatherDescription: '',
  });

  return (
    <>
      <TextContainer>
        <SmallTitle>
          {weekDay}, {hourDay}h.
        </SmallTitle>{' '}
        <Title>Brasília-DF</Title>
        <Tag>
          <SmallTitle>Céu limpo</SmallTitle>
        </Tag>
        <img src='src/assets/imgs/weather-icons/01d.svg' alt='sun' />
      </TextContainer>
      <WeatherContainer>
        <WeatherSquare>
          <Title>
            25 <TbTemperatureCelsius />
          </Title>
          <Row>
            <TemperatureInfo
              icon='src/assets/imgs/weather-icons/thermometer-minus.png'
              label='Mín.'
              value='20'
              celsius
            />
            <TemperatureInfo
              icon='src/assets/imgs/weather-icons/thermometer-plus.png'
              label='Max.'
              value='20'
              celsius
            />
          </Row>
        </WeatherSquare>
        <WeatherSquare>
          <Row className='column'>
            <TemperatureInfo
              icon='src/assets/imgs/weather-icons/wind.png'
              label='Vento.'
              value='20 km/h'
            />
            <TemperatureInfo
              icon='src/assets/imgs/weather-icons/wet.png'
              label='Umidade'
              value='55%'
            />
          </Row>
        </WeatherSquare>
      </WeatherContainer>
    </>
  );
};

const TemperatureInfo = ({ icon, label, value, celsius }) => {
  return (
    <TemperatureContainer>
      <img src={icon} alt='' />
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
