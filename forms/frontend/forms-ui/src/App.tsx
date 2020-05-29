import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// is there a default theme that i can just supply for convenience's sake?
import { ThemeProvider } from "@material-ui/core/styles";
import Navigation from "./Navigation";
import Forms from "./Forms";
import Home from "./Home";
import theme from "./theme";
import link from "./link";
import "./App.css";

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router basename="/forms">
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Navigation>
            <Switch>
              <Route path="/forms">
                <Forms />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Navigation>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
