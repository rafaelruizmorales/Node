import React from 'react';

import { Provider } from 'react-redux'

import store from './redux/store'

import Nav from './components/Nav'

import Home from './pages/Home';

import SignupForm from './pages/SignupForm';
import SigninForm from './pages/SigninForm';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <div className="App">

            <Nav />

            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/singup" component={SignupForm} />
              <Route path="/singin" component={SigninForm} />
            </Switch>

          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
