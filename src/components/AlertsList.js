import React, { PureComponent } from 'react'
import AlertCard from './AlertCard'

class AlertsList extends PureComponent {
  render() {
    const { alerts } = this.props
    return (
      <div>
        {alerts.map((alert, i) => (
          <AlertCard key={i}
            position={alert.location}
            text={alert.description}
            alertState={alert.response}
          />
        ))}
      </div>
    )
  }
}

export default AlertsList
