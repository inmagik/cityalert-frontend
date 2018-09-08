import React, { PureComponent }  from 'react'

class AlertCard extends PureComponent {
  render() {
    const { alert, onVote } = this.props
    return (
      <div className="card mt-1">
        <div className="card-body p-1">
          <div className='d-inline-flex w-100'>
            <div className='alertcard-right'>
              <img className="img-thumbnail" src="http://placekitten.com/100/100" alt="Card cap" />
              <div className='p-2'>
                {/* <h5>Categoria: {}</h5> */}
                <p>{alert.description}</p>
              </div>
            </div>
            <div className='alertcard-left'>
              {/* <span>Posizione: {alert.position}</span><br/> */}
              {/* <span>Stato: <b>{alertState}</b></span> */}
              {!alert.vote_by_me && <button onClick={() => onVote(alert.id)}>Vote</button>}
              <div>+ {alert.votes_count}</div>
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
