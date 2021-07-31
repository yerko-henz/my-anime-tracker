import React, { useState, useEffect } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/Global";
import { lightTheme, darkTheme } from "./styles/Theme";

import List from "./components/List";
import MyAnime from "./components/MyAnime";
import Anime from "./components/Anime";
import Nav from "./components/Nav";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

function App() {
  const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   const localTheme = localStorage.getItem("theme");
  //   console.log("th", localTheme);
  //   // localTheme && setTheme(localTheme);
  // }, []);

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  const setMode = (mode) => {
    // localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Router>
          <Nav />
          {/* <Toggle theme={theme} toggleTheme={themeToggler} /> */}

          <Route exact path="/" component={MyAnime} />
          <Route exact path="/season" component={List} />
          <Route exact path="/anime/:title" component={Anime} />
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
