import React, { PureComponent } from 'react'

class SubNavbar extends PureComponent {
  render() {
    return (
      <div className="subnavbar">
        <div className='pt-1'>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Tutte le categorie
          </button>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-dark btn-small my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default SubNavbar
