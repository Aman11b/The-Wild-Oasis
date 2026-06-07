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

## What is SUPABASE

- Service that allows developers to easily creaste a back end with a postgres database
- Automatically creates a database and APIU so we can easily request and receice data from the server
- no bacend development needed
- supabase also comes with easy-to-use user authentication and file storage

### Modeling State

| State / Domain | Feature Categories                       |
| -------------- | ---------------------------------------- |
| Booking        | Bookings, Dashboard, Check-in, Check-out |
| Cabins         | Cabin Management                         |
| Guests         | Guest Management                         |
| Settings       | Application Settings                     |
| Users          | Authentication & User Management         |

- All this satet will be global remote state ,stored withing Supabase
- There will be on table for each state "Slice" in the database

### The Bookings Table

- Bookings are about a guest renting a cabin
- So a boookins needs information about what guest is booking whihc cabin:we need to connect them
- Supabase uses a Postgres DB,whihc is SQL (relational DB),So we join tables using foreign keys(guestID,CabinId)

Booking > id,guestId,cabinId,....
Guest > id,email,...
Cabin > id, name,...

> We connect a booking with a cabin by storing the cabin;s id(primary key) inside the booking cabin Id(Foreign key)

## React Query (TanStack Query )

- Powerful library for managing remote(server) state
- Many features that allows us to write a lot less code,while also making the UX a lot better

1. Data is stored in a cache
2. Automatic loadinh and error state
3. Automatic re-fetching to keep state synced
4. pre-fetching(pagination - fetching data of next pages with current page)
5. easy remote state mutation(updating)
6. offline support

- Needed becaused rempote state is fundamentally differently from regular UI state
- other tools: SWR, Reduc, RTK, but RQ is most popular

- installation react query

```bash
npm i @tanstack/react-query@4
```

- installing react dev tools

```bash
npm install @tanstack/react-query-devtools@4
```

- setting

```bash
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

<QueryClientProvider client={queryClient}>
  <ReactQueryDevtools initialIsOpen={false} />
  <GlobalStyles />
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="account" element={<Account />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
</QueryClientProvider>
```
