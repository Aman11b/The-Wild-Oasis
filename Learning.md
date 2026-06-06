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
