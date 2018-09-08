import React, { PureComponent } from 'react'
import AlertCard from './AlertCard'

class AlertsList extends PureComponent {
  render() {
    const { alerts } = this.props
    return (
      <div>
        {alerts.map((alert, i) => {
          <AlertCard key={i} />
        })}
      </div>
    )
  }
}

export default AlertsList
