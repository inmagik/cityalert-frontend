import React from 'react'
import { Provider } from 'react-redux'
import Alerts from './pages/Alerts'
import AlertDetail from './pages/AlertDetail'
import AddAlert from './pages/AddAlert'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
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
        <AuthRoute path='/alert-detail/:id' exact component={AlertDetail} />
        <AuthRoute path='/alerts/add' exact component={AddAlert} />
        <AuthRoute path='/alerts/:activeTab?' exact component={Alerts} />
        <Redirect from='/' to='/alerts' />
      </Switch>
    </Router>
  </Provider>
)
export default App
