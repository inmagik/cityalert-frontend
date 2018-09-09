import React, { PureComponent } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'

class Navbar extends PureComponent {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="navbar-nav mr-auto">
          <Link className="navbar-brand" to='/alerts/list'>CityAlert</Link>
          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
        </div>
        <Route path='/alerts/(list|map)' exact component={() => (
          <Link className="btn btn-outline-primary" to='/alerts/add'>
            <i className="fa fa-plus"></i>{' '}Aggiungi segnalazione
          </Link>
        )} />


      </nav>
    )
  }
}

export default withRouter(Navbar)
