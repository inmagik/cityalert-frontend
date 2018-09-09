import React, { PureComponent } from 'react'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'
import capitalize from 'lodash/capitalize'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { responsesStatuses } from '../utils'

class SubNavbar extends PureComponent {
  render() {
    const { alertTypes, onChangeFilter, onChangeFilterDebounced, values, alerts } = this.props
    const alertTypesById = keyBy(alertTypes, 'id')
    return (
      <div className="subnavbar" style={{ zIndex: 99999 }}>
        <div className='mx-1'>
        <UncontrolledDropdown>
        <DropdownToggle caret>
          Tipo: {get(alertTypesById, `${values.alert_type}.name`, 'Tutti')}
        </DropdownToggle>
          <DropdownMenu>
            {alertTypes.map(alertType => (
                <DropdownItem
                  active={+values.alert_type === alertType.id}
                  key={alertType.id} onClick={() => onChangeFilter({
                  ...values,
                  alert_type: alertType.id,
                })}>{alertType.name}</DropdownItem>
            ))}
            <DropdownItem onClick={() => onChangeFilter({
              ...values,
              alert_type: undefined,
            })}>Tutti</DropdownItem>
          </DropdownMenu>
      </UncontrolledDropdown>
        </div>

        <div className='mx-1'>
        <UncontrolledDropdown>
        <DropdownToggle caret>
          Stato: {values.response__status ? capitalize(values.response__status) : 'Tutti'}
        </DropdownToggle>
          <DropdownMenu>
            {responsesStatuses.map(status => (
                <DropdownItem
                  active={values.response__status === status}
                  key={status} onClick={() => onChangeFilter({
                  ...values,
                  response__status: status,
                })}>{capitalize(status)}</DropdownItem>
            ))}
            <DropdownItem onClick={() => onChangeFilter({
              ...values,
              response__status: undefined,
            })}>Tutti</DropdownItem>
          </DropdownMenu>
      </UncontrolledDropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mx-2">
          <span className="">{alerts.length} segnalazioni</span>
        </div>

        <div className='w-25'>
          <input
            onChange={e => onChangeFilterDebounced({
              ...values,
              search: e.target.value
            })}
            value={typeof values.search === 'undefined' ? '' : values.search}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Cerca" aria-label="Search" />
        </div>
        {/* <form className="form-inline my-2 my-lg-0">
          <button className="btn btn-outline-dark btn-small my-2 my-sm-0" type="submit">Search</button>
        </form> */}
      </div>
    )
  }
}

export default SubNavbar
