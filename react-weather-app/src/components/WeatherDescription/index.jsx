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

const Weather = ({ weatherData }) => {
  const weekDay = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
  });
  const hourDay = new Date().getHours();

  const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <>
      <TextContainer>
        <SmallTitle>
          {capitalizeFirstLetter(weekDay)}, {hourDay}h.
        </SmallTitle>{' '}
        <Title>{weatherData.name}</Title>
        <Tag>
          <SmallTitle>{capitalizeFirstLetter(weatherData.weather[0].description)}</SmallTitle>
        </Tag>
        <img src={`src/assets/imgs/weather-icons/${weatherData.weather[0].icon}.svg`} alt='sun' />
      </TextContainer>
      <WeatherContainer>
        <WeatherSquare>
          <Title>
            {Math.round(weatherData.main.temp)} <TbTemperatureCelsius />
          </Title>
          <Row>
            <Temperature
              icon='thermometer-minus.png'
              label='Mín'
              value={weatherData.main.temp_min}
            />
            <Temperature
              icon='thermometer-plus.png'
              label='Máx'
              value={weatherData.main.temp_max}
            />
          </Row>
        </WeatherSquare>
        <WeatherSquare>
          <Row className='column'>
            <Wind value={Math.imul(weatherData.wind.speed, 3.6)} />
            <Wet value={weatherData.main.humidity} />
          </Row>
        </WeatherSquare>
      </WeatherContainer>
    </>
  );
};

const Wind = ({ value }) => {
  return (
    <TemperatureContainer>
      <img src={`src/assets/imgs/weather-icons/wind.png`} alt='wind icon' />
      <div>
        <SmallTitle>Vento</SmallTitle>
        <p>
          {value} <span>km/h</span>
        </p>
      </div>
    </TemperatureContainer>
  );
};

const Wet = ({ value }) => {
  return (
    <TemperatureContainer>
      <img src={`src/assets/imgs/weather-icons/wet.png`} alt='wind icon' />
      <div>
        <SmallTitle>Umidade</SmallTitle>
        <p>
          {value} <span>%</span>
        </p>
      </div>
    </TemperatureContainer>
  );
};

const Temperature = ({ label, value, icon }) => {
  return (
    <TemperatureContainer>
      <img src={`src/assets/imgs/weather-icons/${icon}`} alt='temperature icon' />
      <div>
        <SmallTitle>{label}</SmallTitle>
        <p>
          {Math.round(value)} <span>%</span>
        </p>
      </div>
    </TemperatureContainer>
  );
};

export default Weather;
