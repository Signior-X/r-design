import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom';

import Profile from './components/profile';
import MyCarousel from './components/MyCarousel';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: 'Priyam'
    }
  }

  render() {
    return (
      <div id="main">
        <HashRouter>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/carousel">
              <MyCarousel />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
