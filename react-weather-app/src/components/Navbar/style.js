import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: 1.25rem;
  padding: 3vh 0;

  button {
    position: absolute;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
  }
  button svg {
    font-size: 1.25rem;
  }
`;

export { Nav };
