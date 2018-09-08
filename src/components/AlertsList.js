import React, { PureComponent } from 'react'
import AlertCard from './AlertCard'

class AlertsList extends PureComponent {
  render() {
    const { alerts, onVote } = this.props
    return (
      <div>
        {alerts.map((alert, i) => (
          <AlertCard key={i} alert={alert} onVote={onVote} />
        ))}
      </div>
    )
  }
}

export default AlertsList
