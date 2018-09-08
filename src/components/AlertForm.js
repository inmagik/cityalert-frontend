import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { FieldInput, FieldPosition } from './form'
import { required } from './form/validation'


class AlertForm extends Component {
  render() {
    const { handleSubmit, alertTypes, valid} = this.props
    return (
      <form onSubmit={handleSubmit}>

        <Field
          label={'Tipo di problema:'}
          component={FieldInput}
          type='select'
          name={'alert_type'}
        >
          {alertTypes.map(alertType => (
            <option key={alertType.id} value={alertType.id}>{alertType.name}</option>
          ))}
          <option value={0}>Altro</option>
        </Field>

        <Field
          placeholder={'Descrizione'}
          component={FieldInput}
          name={'description'}
          type={'textarea'}
          validate={required}
        />

        <Field
          component={FieldPosition}
          name='position'
        />

        <button disabled={!valid}
          type='submit' className='btn btn-success'>Invia</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'alert',
})(AlertForm)
