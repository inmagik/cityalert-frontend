import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadSimilarAlerts, getSimilarAlerts } from '../state/similarAlerts'

class ModalAlertsList extends Component {
  componentDidMount() {
    const { alert } = this.props
    this.props.loadSimilarAlerts({
      ...alert,
      image: undefined,
      position: {
        type: 'Point',
        coordinates: [
          alert.position.longitude,
          alert.position.latitude
        ],
      },
      location: alert.position.location,
      alert_type: +alert.alert_type === 0 ? null : alert.alert_type,
    })
  }

  render() {
    const { alerts } = this.props
    return (
      <div>
        {alerts.map(alert => (
          <div key={alert.id}>
            {alert.description}
          </div>
        ))}
        <button onClick={this.props.confirm} className='btn btn-success'>Conferma</button>
      </div>
    )
  }
}

export default connect(state => ({
  alerts: getSimilarAlerts(state) || [],
}), {
  loadSimilarAlerts,
})(ModalAlertsList)
