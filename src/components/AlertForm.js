import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Label } from 'reactstrap'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { FieldInput, FieldPosition, FieldFile } from './form'
import { required } from './form/validation'
import ModalAlertsList from './ModalAlertsList'


class AlertForm extends Component {
  state = {
    similarSearch: null,
  }

  searchForSimilar = () => {
    this.setState({
      similarSearch: this.props.values,
    })
  }

  closeModal = () => {
    this.setState({
      similarSearch: null,
    })
  }

  render() {
    const { handleSubmit, alertTypes, valid, values} = this.props
    console.log(values)
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


        <Field
          component={FieldFile}
          name='image'
        />


        <Modal isOpen={this.state.similarSearch !== null} toggle={this.closeModal}>
          <div className="p-4">
            <h5>Conferma invio</h5>
          </div>
          <ModalBody>
            {this.state.similarSearch !== null && <ModalAlertsList
              alert={this.state.similarSearch}
              confirm={() => handleSubmit()}
            />}
          </ModalBody>
        </Modal>

        <div className="text-center m-2 p-3 bg-light">
          <button disabled={!valid}
            onClick={this.searchForSimilar}
            type='button' className='btn btn-success'>Invia segnalazione</button>
        </div>

      </form>
    )
  }
}

const selector = formValueSelector('alert')

export default reduxForm({
  form: 'alert',
})(connect(state => ({
  values: selector(state, 'description', 'position', 'alert_type'),
}))(AlertForm))
