import React, { PureComponent } from 'react'
import AlertsList from '../components/AlertsList'
import Layout from '../components/Layout'
import SubNavbar from '../components/SubNavbar'
import BottomTabs from '../components/BottomTabs'
import { connect } from 'react-redux'
import { loadAlerts, getAlerts, voteAlert } from '../state/alerts'
import { loadAlertTypes, getAlertTypes } from '../state/alertTypes'
import debounce from 'lodash/debounce'
import qs from 'query-string'

class UserAlerts extends PureComponent {
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
          <div className="p-4">
            <h2 className="mb-0">Le tue segnalazioni</h2>
          </div>
          <AlertsList alerts={alerts}/>
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
})(UserAlerts)
