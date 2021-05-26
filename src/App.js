import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import List from "./components/List";
import MyAnime from "./components/MyAnime";
import Anime from "./components/Anime";
import Nav from "./components/Nav";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />

        <Route exact path="/" component={MyAnime} />
        <Route exact path="/season" component={List} />
        <Route exact path="/anime/:title" component={Anime} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
