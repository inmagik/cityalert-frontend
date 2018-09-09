import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { getCurrentPosition } from '../state/currentPosition'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { makeIcon } from '../utils'
import { Link } from 'react-router-dom'
import MomentSpan from './MomentSpan'

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const currentPostIcon = L.icon.fontAwesome({
  iconClasses: 'fa fa-user', // you _could_ add other icon classes, not tested.
  markerColor: '#222',
  iconColor: '#FFF' })

class AlertsMap extends PureComponent {

  state = {
    lat: 45.69601,
    lng: 9.66721,
    zoom: 13,
  }

  render() {
    const { alerts, currentPosition } = this.props
    const position = [this.state.lat, this.state.lng]

    console.log("alerts", alerts)
    const renderKey = (alerts || []).map(x => x.id).join('-')

    return (
      <div className="alerts-map bg-dark">
        <Map center={position} zoom={this.state.zoom} className="w-100 h-100">
        <TileLayer
          attribution={stamenTonerAttr}
          url={stamenTonerTiles}
        />

        {/* <MarkerClusterGroup> */}
        {alerts && alerts.length > 0 && alerts.map((item, i) =>
          item.position && <Marker icon={ makeIcon(item)} key={item.id} position={item.position.coordinates.slice().reverse()}>
            <Popup>
              {item.alert_type_verbose}
              {item.image && <div>
                <img className="img-thumbnail" src={item.image} alt={item.description}></img>
              </div>}
              <p>
                {item.description}
              </p>
              <div>
                <MomentSpan date={item.created}/>
              </div>
              <Link className="btn btn-default" to={`/alert-detail/${item.id}`}>
                DETTAGLIO
              </Link>
            </Popup>
          </Marker>
        )}
      {/* </MarkerClusterGroup> */}
      {currentPosition && <Marker
        key={renderKey}
        icon={currentPostIcon}
        position={[currentPosition.latitude, currentPosition.longitude]}>
        <Popup>
          Posizione corrente.
        </Popup>
      </Marker>}
      </Map>

      </div>
    )
  }
}

export default connect(state => ({
  currentPosition: getCurrentPosition(state),
}), {

})(AlertsMap)
