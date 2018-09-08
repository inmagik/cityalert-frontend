import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { FieldInput } from './form'

const FieldPosition = ({ input: { value, onChange } }) => (
  <div className='mb-2'>
    <div>Posizione:</div>
    {value.location}
    <div>
      <small>{value.latitude}, {value.longitude}</small>
    </div>
    <button className='btn btn-primary btn-sm'>Cambia <i className='' /></button>
  </div>
)

class AlertForm extends Component {
  render() {
    const { handleSubmit, alertTypes } = this.props
    return (
      <form onSubmit={handleSubmit}>

        <Field
          component={FieldPosition}
          name='position'
        />

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
        />

        <button type='submit' className='btn btn-success'>Invia</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'alert',
})(AlertForm)
