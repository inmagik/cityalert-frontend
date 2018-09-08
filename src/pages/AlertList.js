import React, { PureComponent } from 'react'
import AlertCard from '../components/AlertCard'
import Navbar from '../components/Navbar'

class AlertList extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
        <div className='p-2'>
          <AlertCard />
          <AlertCard />

        </div>
      </div>
    )
  }
}

export default AlertList
