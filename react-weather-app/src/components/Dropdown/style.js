import styled, { css } from 'styled-components';
import { SetupFlex } from '../../styles/globalStyle';

const SquareStyle = css`
  border-radius: 0.35rem;
  border: solid 1px ${props => props.theme.input.border};
  height: 40px;
  background-color: ${props => props.theme.input.background};
  color: ${props => props.theme.input.textColor};
  font-size: 1rem;
`;

const Container = styled.div`
  ${SetupFlex};
  gap: 10px;
  margin: 3vh auto;
`;

const Select = styled.select`
  ${SquareStyle};
  width: 125px;
  padding: 0 0.5vw;
`;

const Button = styled.button`
  width: 40px;
  ${SquareStyle};
`;

const SpinnerContainer = styled.div`
  ${SetupFlex};
`;

const Loading = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: 25px;
  height: 25px;
  border: 3px solid ${props => props.theme.textColor}; /* Light grey */
  border-top: 3px solid ${props => props.theme.input.background}; /* Blue */
  border-radius: 50%;
  animation: spinner .5s linear infinite;
`;

export { Select, Container, Button, SquareStyle, SpinnerContainer, Loading };
