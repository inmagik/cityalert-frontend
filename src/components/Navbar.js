import React, { PureComponent } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAuthUser } from 'eazy-auth'

class Navbar extends PureComponent {
  render() {
    const { user } = this.props

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="navbar-nav mr-auto">
          <Link className="navbar-brand" to='/alerts/list'>CityAlert</Link>

          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
        </div>
        <span className="nav-link">
          <Link className="navbar-link" to='/user-alerts'>{user.email}</Link>
        </span>

        <Route path='/alerts/(list|map)' exact component={() => (
          <Link className="btn btn-outline-primary" to='/alerts/add'>
            <i className="fa fa-plus"></i>
          </Link>
        )} />
        <Route path='/alerts' exact component={() => (
          <Link className="btn btn-outline-primary" to='/alerts/add'>
            <i className="fa fa-plus"></i>
          </Link>
        )} />


      </nav>
    )
  }
}

const mapStateToProps = state => ({
  user: getAuthUser(state),
})

export default withRouter(connect(mapStateToProps)(Navbar))
