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

  toggleTab = (tabName) => () => {
    this.props.history.push(`/alerts/${tabName}`)
  }

  render() {
    const { alerts, match } = this.props
    const { params } = match
    const activeTab = params.activeTab || 'list'

    console.log(alerts)
    return (
      <Layout>
        <SubNavbar />
        <div className='alerts-container'>
          {activeTab === 'list' && <AlertsList alerts={alerts}/>}
          {activeTab === 'map' && <AlertsMap alerts={alerts}/>}
        </div>
        <BottomTabs toggleTab={this.toggleTab} currentTab={activeTab}/>
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
