import React, { Component } from 'react'
import Layout from '../components/Layout'
import { connect } from 'react-redux'
import AlertForm from '../components/AlertForm'
import { loadAlertTypes, getAlertTypes } from '../state/alertTypes'
import { getCurrentPosition } from '../state/currentPosition'
import { createAlert } from '../state/alerts'

class AddAlert extends Component {
  componentDidMount() {
    this.props.loadAlertTypes()
  }

  render() {
    const { alertTypes, currentPosition, createAlert } = this.props
    return (
      <Layout className='layout-content'>
        <div className='container'>
          {currentPosition && <AlertForm
            initialValues={{
              alert_type: alertTypes.length ? alertTypes[0].id : null,
              position: {
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                location: currentPosition.reverse.display_name,
              }
            }}
            alertTypes={alertTypes}
            onSubmit={(values) => {
              const alert = {
                ...values,
                position: {
                  type: 'Point',
                  coordinates: [
                    values.position.longitude,
                    values.position.latitude
                  ],
                },
                location: values.position.location,
                alert_type: +values.alert_type === 0 ? null : values.alert_type,
              }
              return createAlert(alert)
            }}
          />}
        </div>
      </Layout>
    )
  }
}

const emptyList = []
export default connect(state => ({
  currentPosition: getCurrentPosition(state),
  alertTypes: getAlertTypes(state) || emptyList,
}), {
  loadAlertTypes,
  createAlert,
})(AddAlert)
