import React, { Component } from 'react'
import { connect } from 'react-redux'
import AlertForm from '../components/AlertForm'
import { loadAlertTypes, getAlertTypes } from '../state/alertTypes'

class AddAlert extends Component {
  componentDidMount() {
    this.props.loadAlertTypes()
  }

  render() {
    const { alertTypes } = this.props
    console.log(alertTypes)
    return (
      <div className='container'>
        <AlertForm />
      </div>
    )
  }
}

const emptyList = []
export default connect(state => ({
  alertTypes: getAlertTypes(state) || emptyList,
}), {
  loadAlertTypes,
})(AddAlert)
