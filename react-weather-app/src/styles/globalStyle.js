import { createGlobalStyle } from 'styled-components';

const light = {
  background: '#fff',
  text: '#333',
};

const dark = {
  background: '#333',
  text: '#fff',
};

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'San Francisco';
        font-weight: 400;
        src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff');
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

    }

    body {
        font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, sans-serif;
        max-width: 755px;
        margin: 0 auto;
        background-color: ${props => props.theme.background};
        color: ${props => props.theme.text};
    }
    
`;

export { GlobalStyle, light, dark };
