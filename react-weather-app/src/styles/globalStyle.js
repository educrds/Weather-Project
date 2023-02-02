import { createGlobalStyle, css } from 'styled-components';

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
        color: ${props => props.theme.textColor};
        background-color: ${props => props.theme.background};
    }
`;

const SetupFlex = css`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export { GlobalStyle, SetupFlex };
