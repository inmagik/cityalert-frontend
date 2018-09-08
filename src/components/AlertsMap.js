import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { getCurrentPosition } from '../state/currentPosition'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

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

    return (
      <div className="alerts-map bg-dark">
        <Map center={position} zoom={this.state.zoom} className="w-100 h-100">
        <TileLayer
          attribution={stamenTonerAttr}
          url={stamenTonerTiles}
        />
        {/* {currentPosition && <Marker position={[currentPosition.latitude, currentPosition.longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>} */}
        {/* <MarkerClusterGroup> */}
        {alerts && alerts.length > 0 && alerts.map((item, i) =>
          item.position && <Marker key={item.id} position={item.position.coordinates.slice().reverse()}>
            <Popup>
              {item.alert_type}
            </Popup>
          </Marker>
        )}
      {/* </MarkerClusterGroup> */}
      </Map>

      </div>
    )
  }
}

export default connect(state => ({
  currentPosition: getCurrentPosition(state),
}), {

})(AlertsMap)
