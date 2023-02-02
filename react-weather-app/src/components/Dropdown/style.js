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

export { Select, Container, Button, SquareStyle };
