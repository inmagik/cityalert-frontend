import React, { PureComponent } from 'react'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SubNavbar extends PureComponent {
  render() {
    const { alertTypes, onChangeFilter, onChangeFilterDebounced, values } = this.props
    const alertTypesById = keyBy(alertTypes, 'id')
    return (
      <div className="subnavbar">
        <div className='pt-1'>
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

        <div className='pt-1 w-100 ml-2'>
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
