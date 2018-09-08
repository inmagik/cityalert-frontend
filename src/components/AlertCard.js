import React, { PureComponent }  from 'react'

class AlertCard extends PureComponent {
  render() {
    const { text, category, image, position, alertState } = this.props
    return (
      <div className="card m-y-1">
        {/* <img className="card-img-top" src=".../100px180/" alt="Card image cap"> */}
        <div className="card-body">
          <div className='d-inline-flex w-100'>
            <div style={{flex:2}}>
              <h5 className="card-title">Categoria: {category}</h5>
              <p className="card-text">{text}</p>
            </div>
            <div style={{flex:1}}>
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
