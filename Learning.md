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

> to include this in application come to App.js,GlobalStyles needs to be added in the component tree but it cannot accept any children we want this to be sibling of StyledApp

```bash
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
      </StyledApp>
    </>
```

> Advance usage is styled component ins theming by exporting ThemeProvider wrapper component which provied a theme to all react components underneath itself via the content API

- styled component props and css function

```bash
 <Heading as="h2">The Wild Oasis in h2</Heading>
```

```bash

/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */

import styled, { css } from "styled-components";

// const text = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow;"}
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

      ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.5rem;
      font-weight: 400;
    `}
  line-height:1.4
`;

export default Heading;

```

- you can set a default type to any react component like this

```bash
  const Row = styled.div`
    display: flex;
    ${(props) =>
      props.type === "horizontal" &&
      css`
        justify-content: space-between;
        align-items: center;
      `}

    ${(props) =>
      props.type === "vertical" &&
      css`
        flex-direction: column;
        gap: 2rem;
      `}
  `;

  Row.defaultProps = {
    type: "vertical",
  };
```
