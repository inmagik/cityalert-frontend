import React, { PureComponent } from 'react'
import AlertCard from '../components/AlertCard'
import Navbar from '../components/Navbar'
import SubNavbar from '../components/SubNavbar'

class AlertList extends PureComponent {
  render() {
    return (
      <div className='alertlist-page'>
        <Navbar />
        <SubNavbar />
        <div className='p-2'>
          <AlertCard />
          <AlertCard />

        </div>
      </div>
    )
  }
}

export default AlertList
