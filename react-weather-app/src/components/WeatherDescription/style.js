import styled from 'styled-components';
import { SetupFlex } from '../../styles/globalStyle';
import { Container, SquareStyle } from '../Dropdown/style';

const WeatherContainer = styled.div`
  ${SetupFlex};
  flex-direction: row;

  @media (max-width: 675px) {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  ${SetupFlex}
  color: ${props => props.theme.textColor};
  flex-direction: column;
  row-gap: 0.2vh;

  img {
    width: 225px;
    filter: drop-shadow(rgba(0, 0, 0, 0.16) 0px 1px 4px);
  }
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 800;
  letter-spacing: 0.2px;
  font-size: 3.5rem;

  svg {
    font-size: 2.5rem;
    margin-left: -8px;
  }
`;

const SmallTitle = styled.p`
  font-size: 1.35rem;
  color: ${props => props.theme.input.textColor};
`;

const Tag = styled.div`
  ${SquareStyle};
  ${SetupFlex};
  padding: 1vh 2vw;
  border-radius: 2rem;
  width: auto;
`;

const WeatherSquare = styled(Container)`
  ${SquareStyle};
  color: ${props => props.theme.textColor};
  border-radius: 1.3rem;
  flex-direction: column;
  width: 330px;
  height: 180px;
  margin: 1vh 1vw;
`;

const TemperatureContainer = styled.div`
  ${SetupFlex};
  gap: 5px;

  > img {
    width: 36px;
  }

  > div p {
    text-align: left;
  }

  > div span{
    font-size: 1.15rem;
    /* color: ${props => props.theme.input.textColor}; */
    font-weight: 400;
  }

  p:nth-child(2) {
    font-size: 1.5rem;
    font-weight: 800;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;

  &.column {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    width: 50%;
  }
`;

export {
  TextContainer,
  Title,
  SmallTitle,
  Tag,
  WeatherSquare,
  TemperatureContainer,
  WeatherContainer,
  Row,
};
