import React, { PureComponent }  from 'react'
import { Link } from 'react-router-dom'
import { getAlertColor } from '../utils'
import { connect } from 'react-redux'
import { getAuthUser } from 'eazy-auth'

class AlertCard extends PureComponent {
  render() {
    const { alert, onVote, user } = this.props
    return (
      <div className="card mt-1">
        <div className="card-body p-1">
          <div className='d-inline-flex w-100 card-container'>
            <div className='alertcard-right '>
              <div style={{width:100}} className="mr-2">
                {alert.image && <img className="img-thumbnail p-0 border-0" src={alert.image} alt="Card cap" />}
              </div>
              <div className='p-2'>
                <b>{alert.alert_type_verbose} {alert.response && <span className="badge ml-1" style={{backgroundColor:getAlertColor(alert), color: '#fff'}}>
                  {alert.response.status}</span>}
                  {user && user.is_staff && alert.assigned_office && <span className="badge badge-dark ml-1">Ufficio: {alert.assigned_office_verbose}</span>}
                  </b>
                  <br/>

                <div>{alert.description}</div>
                <div>{alert.location}</div>
              </div>
            </div>
            <div className='alertcard-left'>
              <div className='mb-2'>
                <b className='pt-1 text-info'>+ {alert.votes_count}</b>
                {onVote &&
                  <div>
                    {!alert.vote_by_me
                    ? <button className="btn btn-info btn-sm ml-1" onClick={() => onVote(alert.id)}>VOTA <i className="fa fa-thumbs-up"></i></button>
                    : <span className='text-info' style={{height:31}}><i className="fa fa-heart"></i></span>}

                  </div>}
              </div>
              <div className='mt-3'>
                <Link className='btn btn-light' to={`/alert-detail/${alert.id}`}>
                  VEDI{' '}
                  <i className="fa fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AlertCard.defaultProps = {
  category: 'illuminazione',
  text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
  position: 'Via G.Cesare 15',
  alertState: 'accettato',
}

const mapStateToProps = state => ({
  user: getAuthUser(state),
})

export default connect(mapStateToProps)(AlertCard)
