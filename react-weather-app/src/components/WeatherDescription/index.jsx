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

  return (
    <>
      <TextContainer>
        <SmallTitle>
          {weekDay}, {hourDay}h.
        </SmallTitle>{' '}
        <Title>{weatherData.name}</Title>
        <Tag>
          <SmallTitle>{weatherData.weather[0].description}</SmallTitle>
        </Tag>
        <img src={`src/assets/imgs/weather-icons/${weatherData.weather[0].icon}.svg`} alt='sun' />
      </TextContainer>
      <WeatherContainer>
        <WeatherSquare>
          <Title>
            {Math.round(weatherData.main.temp)} <TbTemperatureCelsius />
          </Title>
          <Row>
            <TemperatureInfo
              icon='src/assets/imgs/weather-icons/thermometer-minus.png'
              label='Mín.'
              value={Math.round(weatherData.main.temp_min)}
              celsius
            />
            <TemperatureInfo
              icon='src/assets/imgs/weather-icons/thermometer-plus.png'
              label='Max.'
              value={Math.round(weatherData.main.temp_max)}
              celsius
            />
          </Row>
        </WeatherSquare>
        <WeatherSquare>
          <Row className='column'>
            <TemperatureInfo
              icon='src/assets/imgs/weather-icons/wind.png'
              label='Vento.'
              value={`${Math.imul(weatherData.wind.speed, 3.6)} km/h`}
            />
            <TemperatureInfo
              icon='src/assets/imgs/weather-icons/wet.png'
              label='Umidade'
              value={`${weatherData.main.humidity}%`}
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
