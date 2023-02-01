import { useState } from 'react';
import { Nav } from './style';
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { light, dark } from '../../styles/theme';

function useTheme() {
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
  };

  return [theme, toggleTheme];
}

const Navbar = ({ onClick, theme }) => {
  return (
    <Nav>
      Previsão do tempo
      <button onClick={onClick}>{theme === light ? <BsMoonFill /> : <BsSun />}</button>
    </Nav>
  );
};

export { Navbar, useTheme };
