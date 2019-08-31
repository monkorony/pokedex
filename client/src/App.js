import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle";
import React, { Component } from "react";
import Navigation from "./components/navbar";
import Dashboard from "./components/dashboard";
import Pokemon from "./components/pokemon/pokemon";
import PokemonSingle from "./components/pokemon/pokemonSingle";
import Pokemons from "./components/pokemon/Pokemons";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemons/" component={Pokemons} />
              <Route exact path="/pokemon/:pokemonIndex/" component={Pokemon} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
