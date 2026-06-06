# Styles Components

> let's us write css in javascript component file

```bash
 npm i styled-components
```

```bash
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

<H1>The Wild Oasis</H1>
```

- styled return a react component

> downlode this extention -> vscode-styled-components

- to style the preexixting App component

```bash
  const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;
```

- to create global styles create a GlobalStyles.js file and pase the global css inside this

```bash
const GlobalStyles = createGlobalStyle``;
export default GlobalStyles;
```

> to incluyde this in application come to App.js,GlobalStyles needs to be added in the component tree but it cannot accept any children we want this to be sibling of StyledApp

```bash
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
      </StyledApp>
    </>
```

> Advance usage is styled component ins theming by exporting <ThemeProvider> wrapper component whihc provied a theme to all react components underneath itself via the content API
