import React from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { About } from './components/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router basename={"/devstory"}>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/app">
          <Dashboard />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

