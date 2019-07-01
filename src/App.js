import React, { Component } from 'react';
import Navigation from './components/navbar';
import Dashboard from './components/dashboard';
import Pokemon from './components/pokemon/pokemon';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
