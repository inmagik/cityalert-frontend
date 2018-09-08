<<<<<<< HEAD
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AlertList from './pages/AlertList'

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <AlertList />
    );
  }
}

export default App;
=======
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { GuestRoute, AuthRoute } from 'eazy-auth'
import store from './state'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        {/* Auth / Recover / Register */}
        {/* <GuestRoute path='/login' exact component={Login} /> */}
        {/* <GuestRoute path='/recover' exact component={Recover} />
        <GuestRoute path='/reset/:token' exact component={Reset} />
        <GuestRoute path='/register' exact component={Recover} /> */}
      </Switch>
    </Router>
  </Provider>
)
export default App
>>>>>>> d108e7112f003dd50722fcb083fdffab7048c037
