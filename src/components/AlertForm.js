import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { FieldInput } from './form'

class AlertForm extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          component={FieldInput}
          name={'description'}
        />
      </form>
    )
  }
}

export default reduxForm({
  form: 'alert',
})(AlertForm)
