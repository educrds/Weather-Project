import { Nav } from './style';
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { useState } from 'react';
import { light, dark } from '../../styles/globalStyle';

function useTheme() {
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
  };

  return [theme, toggleTheme];
}

const Navbar = ({onClick}) => {
  return (
    <Nav>
      Previsão do tempo
      <button onClick={onClick}>
        <BsSun />
      </button>
    </Nav>
  );
};

export { Navbar, useTheme };
