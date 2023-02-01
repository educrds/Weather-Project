import { Navbar, useTheme } from './components/Navbar';
import { GlobalStyle } from './styles/globalStyle';

function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <GlobalStyle theme={theme} />
      <Navbar onClick={toggleTheme} />
    </>
  );
}

export default App;
