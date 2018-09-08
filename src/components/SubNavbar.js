import React, { PureComponent } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SubNavbar extends PureComponent {
  render() {
    const { alertTypes, onChangeFilter, onChangeFilterDebounced, values } = this.props
    return (
      <div className="subnavbar">
        <div className='pt-1'>
        <UncontrolledDropdown>
        <DropdownToggle caret>
          Tipo: {values.alertType || 'Tutti'}
        </DropdownToggle>
          <DropdownMenu >
            {alertTypes.map(alertType => (
                <DropdownItem key={alertType.id} onClick={() => onChangeFilter({
                  ...values,
                  alertType: alertType.name
                })}>{alertType.name}</DropdownItem>
            ))}
            <DropdownItem onClick={() => onChangeFilter({
              ...values,
              alertType: undefined,
            })}>Tutti</DropdownItem>
          </DropdownMenu>
      </UncontrolledDropdown>
        </div>

        <div className='pt-1 w-100 ml-2'>
          <input
            onChange={e => onChangeFilterDebounced({
              ...values,
              q: e.target.value
            })}
            value={typeof values.q === 'undefined' ? '' : values.q}
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
