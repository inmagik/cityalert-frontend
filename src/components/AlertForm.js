import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { FieldInput } from './form'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

class FieldPosition extends React.PureComponent {
  state = {
    modalOpen: false,
  }

  toggleOpen = () => this.setState({modalOpen: !this.state.modalOpen})

  render(){
    const { input } = this.props
    const { value, onChange } = input
    const { modalOpen } = this.state


    return (
      <React.Fragment>
        <div className='mb-2'>
          <div>Posizione:</div>
          {value.location}
          <div>
            <small>{value.latitude}, {value.longitude}</small>
          </div>
          <button
            type={'button'}
            onClick={this.toggleOpen}
            className='btn btn-primary btn-sm'>Cambia <i className='' /></button>
        </div>
        <Modal isOpen={modalOpen} toggle={this.toggleOpen}>
          <ModalHeader>
            Scegli posizione
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <input type="text" className="form-control">

              </input>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}



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
