import styled, { css } from 'styled-components';

const squareStyle = css`
  border-radius: 0.35rem;
  border: solid 1px ${props => props.theme.input.border};
  height: 40px;
  background-color: ${props => props.theme.input.background};
  color: ${props => props.theme.input.textColor};
  font-size: 1rem;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 3vh 0;
`;

const Select = styled.select`
  ${squareStyle};
  width: 150px;
  padding: 0 0.5vw;
`;

const Button = styled.button`
  width: 40px;
  ${squareStyle};
`;

export { Select, Container, Button };
