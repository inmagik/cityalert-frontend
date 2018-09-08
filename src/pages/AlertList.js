import React, { PureComponent } from 'react'
import AlertCard from '../components/AlertCard'
import Layout from '../components/Layout'
import SubNavbar from '../components/SubNavbar'
import BottomTabs from '../components/BottomTabs'

class AlertList extends PureComponent {
  render() {
    return (
      <Layout className={'alertlist-page'}>
        <SubNavbar />
        <div className='p-2'>
          <AlertCard />
          <AlertCard />

        </div>
        <BottomTabs />
      </Layout>
    )
  }
}

export default AlertList
