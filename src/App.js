import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import List from "./components/List";
import Anime from "./components/Anime";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" component={List} />
        <Route exact path="/anime/:title" component={Anime} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
