import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadSimilarAlerts, getSimilarAlerts } from '../state/similarAlerts'
import { voteAlert } from '../state/alerts'
import { getAlertColor } from '../utils'

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

  vote = (alert) => {
    if (alert.vote_by_me) {
      this.props.history.push(`/alert-detail/${alert.id}`)
      return
    }
    this.props.voteAlert({ id: alert.id }).then(() => {
      this.props.history.push(`/alert-detail/${alert.id}`)
    })
  }

  render() {
    const { alerts } = this.props
    return (
      <div>
        <div style={{ maxHeight: 500, overflow: 'auto' }}>
        {alerts.map(alert => (
          <div onClick={() => this.vote(alert)} key={alert.id} className='border m-2 p-2' style={{ cursor: 'pointer' }}>
            <b>{alert.alert_type_verbose} {alert.response && <span className="badge ml-1" style={{backgroundColor:getAlertColor(alert), color: '#fff'}}>{alert.response.status}</span>}</b><br/>
            <div>{alert.description}</div>
          </div>
        ))}
        </div>
        <button onClick={this.props.confirm} className='btn btn-success'>Conferma</button>
      </div>
    )
  }
}

export default withRouter(connect(state => ({
  alerts: getSimilarAlerts(state) || [],
}), {
  loadSimilarAlerts,
  voteAlert,
})(ModalAlertsList))
