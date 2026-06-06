import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis in h1</Heading>
        <Button onClick={() => alert("check in")}>Check in</Button>
        <Button onClick={() => alert("check out")}>Check out</Button>
        <Heading as="h2">The Wild Oasis in h2</Heading>
        <Input type="number" placeholder="Number of Guest" />

        <Heading as="h3">The Wild Oasis in h3</Heading>
      </StyledApp>
    </>
  );
}

export default App;
