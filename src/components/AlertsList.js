import React, { PureComponent } from 'react'
import AlertCard from './AlertCard'

class AlertsList extends PureComponent {
  render() {
    const { data } = this.props
    return (
      <div>
        {data.map((datum, i) => {
          <AlertCard key={i} />
        })}
      </div>
    )
  }
}

export default AlertsList
