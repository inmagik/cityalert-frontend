import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { GuestRoute, AuthRoute } from 'eazy-auth'
import store from './state'
import Login from './pages/Login'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        {/* Auth / Recover / Register */}
        <GuestRoute path='/login' exact component={Login} />
        {/* <GuestRoute path='/recover' exact component={Recover} />
        <GuestRoute path='/reset/:token' exact component={Reset} />
        <GuestRoute path='/register' exact component={Recover} /> */}
      </Switch>
    </Router>
  </Provider>
)
export default App
