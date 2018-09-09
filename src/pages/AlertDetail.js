import React, { PureComponent } from 'react'
import AlertsList from '../components/AlertsList'
import AlertsMap from '../components/AlertsMap'
import AlertStaticMap from '../components/AlertStaticMap'
import Layout from '../components/Layout'
import SubNavbar from '../components/SubNavbar'
import BottomTabs from '../components/BottomTabs'
import { connect } from 'react-redux'
import { loadAlert, getAlert, createAlertResponse } from '../state/alerts'
import omitBy from 'lodash/omitBy'
import MomentSpan from '../components/MomentSpan'

import debounce from 'lodash/debounce'
import qs from 'query-string'

class AlertDetail extends PureComponent {

  state = {
    similar: {},
    message: '',
    securityIssue: false,
  }

  componentDidMount() {
    const { match } = this.props
    const { id } = match.params
    this.props.loadAlert({id})
  }

  saveResponse = (status) => () => {
    this.props.createAlertResponse({
      status,
      security_issue: this.state.securityIssue,
      priority: 1,
      message: this.state.message,
      related_alerts: Object.keys(omitBy(this.state.similar, x => !!x)).concat(this.props.alert.id)
    }).then(()=>{
      this.props.history.push("/alerts/list")
    })
  }
  render() {
    const { alert } = this.props
    if(!alert){return null}

    return (
      <Layout >
        <div className="container" style={{paddingTop:50}}>
          <div className="p-4">
            <h2>{alert.alert_type_verbose}</h2>
            <div className="m-2">
              <b>Descrizione:</b> {alert.description}
            </div>
            <div className="m-2 text-muted">
              Inserito il <MomentSpan date={alert.created}/> da {alert.user_email}
            </div>
            <div className="row">
              <div className="col">
                <AlertStaticMap alert={alert}/>
              </div>
              <div className="col text-center d-flex align-items-center justify-content-center">
                {alert.image && <img className="w-100" src={alert.image} alt={'xxx'}></img>}
                {!alert.image && <span>Nessuna immagine</span>}
              </div>

            </div>
            <div className="m-2">

            </div>
          </div>
          <hr/>
          {/* similar alerts */}
          <h3>Segnalazioni simili</h3>
          <div className="alert alert-info mb-2">
            CityAlert ha individuato le seguenti segnalazioni che potrebbero essere simili a quella che stai
            vedendo. Selezionando queste segnalazioni la risposta verrà applicata a tutte.
          </div>
          {alert.similar_alerts && alert.similar_alerts.length > 0 && <div>
            {alert.similar_alerts.map((alert, i)=> {
              return <div className="border m-2 p-2 d-flex" key={i}>
                <div className="check mr-4">
                  <input
                    type="checkbox"
                    onChange={()=>this.setState({similiar: {...this.state.similar, [alert.id]:!this.state.similar[alert.id]}})}
                    checked={this.state.similar[alert.id]}></input>
                </div>
                <div>
                  <h5>{alert.alert_type_verbose}</h5>
                  {alert.description}
                </div>
              </div>
            })}
          </div>}
          <hr/>

          <h3>Problemi di sicurezza</h3>
          <div className="alert alert-info">
            Se la problematica segnalata comporta problemi di sicurezza, indicarlo di seguito.
          </div>
          <div className="form-group text-center mb-2">
            <div className="check">
              <input type="checkbox" checked={this.state.securityIssue} onChange={()=>{this.setState({securityIssue: !this.state.securityIssue})}}/>
              {'  '} Questa segnalazione comporta problemi di sicurezza
            </div>
          </div>
          <hr/>
          <h3>Gestione segnalazione</h3>
          <div className="alert alert-info">
            Utilizzare i pulsanti di seguito per modificare lo stato della risposta.
            Puoi inserire un messaggio visibile ai cittadini insieme allo stato della richiesta.
          </div>
          <div className="p-2">
            <textarea className="w-100" value={this.state.message} onChange={(e)=>{this.setState({message:e.target.value})}}>

            </textarea>
          </div>
          <div className="d-flex justify-content-between mb-3 bg-light">
            <button onClick={this.saveResponse('invalid')} className="btn btn-danger">ANNULLA</button>
            <button onClick={this.saveResponse('accepted')} className="btn btn-primary">PRENDI IN CARICO</button>
            <button onClick={this.saveResponse('resolved')} className="btn btn-success">RISOLVI</button>
          </div>
        </div>
      </Layout>
    )
  }
}


export default connect(state => ({
  alert: getAlert(state),
}), {
  loadAlert, createAlertResponse
})(AlertDetail)
