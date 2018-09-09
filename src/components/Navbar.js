import React, { PureComponent } from 'react'
import { Link, Route } from 'react-router-dom'

class Navbar extends PureComponent {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="navbar-nav mr-auto">
          <Link className="navbar-brand" to='/alerts/list'>Cityalert</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <Route path='/alerts/map' exact>
          <Link className="btn btn-outline-primary" to='/alerts/add'>
            <i className="fa fa-plus"></i>{' '}Aggiungi segnalazione
          </Link>
        </Route>


      </nav>
    )
  }
}

export default Navbar
