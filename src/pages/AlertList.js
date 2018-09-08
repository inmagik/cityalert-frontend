import React, { PureComponent } from 'react'
import AlertCard from '../components/AlertCard'
import Layout from '../components/Layout'
import SubNavbar from '../components/SubNavbar'
import BottomTabs from '../components/BottomTabs'
import { connect } from 'react-redux'
import { loadAlerts, getAlerts } from '../state/alerts'

class AlertList extends PureComponent {
  componentDidMount() {
    this.props.loadAlerts()
  }

  render() {
    const { alerts } = this.props
    console.log(alerts)
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

const emptyList = []
export default connect(state => ({
  alerts: getAlerts(state) || emptyList,
}), {
  loadAlerts,
})(AlertList)
