import Dropdowns from './components/Dropdown';
import { Navbar, useTheme } from './components/Navbar';
import { GlobalStyle } from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';

function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar onClick={toggleTheme} theme={theme} />
        <Dropdowns />
      </ThemeProvider>
    </>
  );
}

export default App;
