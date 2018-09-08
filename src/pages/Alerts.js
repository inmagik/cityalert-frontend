import React, { PureComponent } from 'react'
import AlertsList from '../components/AlertsList'
import AlertsMap from '../components/AlertsMap'
import Layout from '../components/Layout'
import SubNavbar from '../components/SubNavbar'
import BottomTabs from '../components/BottomTabs'
import { connect } from 'react-redux'
import { loadAlerts, getAlerts } from '../state/alerts'

class Alerts extends PureComponent {
  componentDidMount() {
    this.props.loadAlerts()
  }

  render() {
    const { alerts } = this.props
    console.log(alerts)
    return (
      <Layout>
        <SubNavbar />
        <div className='alerts-container'>
          <AlertsList alerts={alerts}/>
          {/* <AlertsMap alerts={alerts}/> */}
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
})(Alerts)
