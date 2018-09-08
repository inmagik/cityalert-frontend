import React, { PureComponent } from 'react'
import AlertsList from '../components/AlertsList'
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
      <Layout className={'alertlist-page'}>
        <SubNavbar />
        <div className='p-2'>
          <AlertsList />
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
