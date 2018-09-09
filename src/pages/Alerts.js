import React, { PureComponent } from 'react'
import AlertsList from '../components/AlertsList'
import AlertsMap from '../components/AlertsMap'
import Layout from '../components/Layout'
import SubNavbar from '../components/SubNavbar'
import BottomTabs from '../components/BottomTabs'
import { connect } from 'react-redux'
import { loadAlerts, getAlerts, voteAlert } from '../state/alerts'
import { loadAlertTypes, getAlertTypes } from '../state/alertTypes'
import debounce from 'lodash/debounce'
import qs from 'query-string'

class Alerts extends PureComponent {
  componentDidMount() {
    this.props.loadAlerts()
    this.props.loadAlertTypes()
  }

  toggleTab = (tabName) => () => {
    this.props.history.push(`/alerts/${tabName}`)
  }

  onChangeFilter = values => {
    const { params } = this.props.match
    const activeTab = params.activeTab || 'list'
    this.props.history.push(`/alerts/${activeTab}?${qs.stringify(values)}`)
    this.props.loadAlerts(values)
  }

  onChangeFilterDebounced = values => {
    const { params } = this.props.match
    const activeTab = params.activeTab || 'list'
    this.props.history.push(`/alerts/${activeTab}?${qs.stringify(values)}`)
    this.loadDebounced(values)
  }

  loadDebounced = debounce((params) => {
    this.props.loadAlerts(params)
  }, 300)

  voteAlert = (id) => {
    this.props.voteAlert({ id })
  }

  render() {
    const { alerts, alertTypes, match, location } = this.props
    const { params } = match
    const activeTab = params.activeTab || 'list'
    const filters = qs.parse(location.search)

    return (
      <Layout>
        <SubNavbar
          values={filters}
          alerts={alerts}
          onChangeFilter={this.onChangeFilter}
          onChangeFilterDebounced={this.onChangeFilterDebounced}
          alertTypes={alertTypes}
        />
        <div className='alerts-container'>
          {activeTab === 'list' && <AlertsList alerts={alerts} onVote={this.voteAlert} />}
          {activeTab === 'map' && <AlertsMap alerts={alerts} />}
        </div>
        <BottomTabs toggleTab={this.toggleTab} currentTab={activeTab}/>
      </Layout>
    )
  }
}

const emptyList = []
export default connect(state => ({
  alerts: getAlerts(state) || emptyList,
  alertTypes: getAlertTypes(state) || emptyList,
}), {
  loadAlerts,
  loadAlertTypes,
  voteAlert,
})(Alerts)
