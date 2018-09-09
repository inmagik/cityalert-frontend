import React, { PureComponent }  from 'react'
import { Link } from 'react-router-dom'
import { getAlertColor } from '../utils'

class AlertCard extends PureComponent {
  render() {
    const { alert, onVote } = this.props
    return (
      <div className="card mt-1">
        <div className="card-body p-1">
          <div className='d-inline-flex w-100'>
            <div className='alertcard-right '>
              <div style={{width:100}} className="mr-2">
                {alert.image && <img className="img-thumbnail p-0 border-0" src={alert.image} alt="Card cap" />}
              </div>
              <div className='p-2'>
                <b>{alert.alert_type_verbose} {alert.response && <span className="badge ml-1" style={{backgroundColor:getAlertColor(alert), color: '#fff'}}>{alert.response.status}</span>}</b><br/>
                <div>{alert.description}</div>
                <div>{alert.location}</div>
              </div>
            </div>
            <div className='alertcard-left'>
              {/* <span>Posizione: {alert.position}</span><br/> */}
              {/* <span>Stato: <b>{alertState}</b></span> */}
              <div className="">

              </div>
              <div className='text-dark d-inline-flex mb-2'>
                <b className='pt-1'>+ {alert.votes_count}</b>
                {!alert.vote_by_me &&
                  <button className="btn btn-outline-dark btn-sm ml-1" onClick={() => onVote(alert.id)}>VOTA <i className="fa fa-thumbs-up"></i></button>}
              </div>
              <div className='mt-3'>
                <Link to={`/alert-detail/${alert.id}`}>
                  DETTAGLIO{' '}
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

export default AlertCard
