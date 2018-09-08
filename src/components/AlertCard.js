import React, { PureComponent }  from 'react'

class AlertCard extends PureComponent {
  render() {
    const { text, category, image, position, alertState } = this.props
    return (
      <div className="card mt-1">
        <div className="card-body p-1">
          <div className='d-inline-flex w-100'>
            <div className='alertcard-right'>
              <img className="img-thumbnail" src="http://placekitten.com/100/100" alt="Card image cap" />
              <div className='p-2'>
                <h5>Categoria: {category}</h5>
                <p>{text}</p>
              </div>
            </div>
            <div className='alertcard-left'>
              <span>Posizione: {position}</span><br/>
              <span>Stato: <b>{alertState}</b></span>
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
