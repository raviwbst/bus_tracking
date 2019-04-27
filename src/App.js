import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import Login from './login/login';
import './App.css';
import Welcome from './welcome/welcome';

function App() {

  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/" component={Login} />
        <Route exact path="/welcome" component={Welcome} />
      </Router>
    </div>
  );
}

export default App;
