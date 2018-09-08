import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

class AlertsMap extends PureComponent {

  state = {
    lat: 45.69601,
    lng: 9.66721,
    zoom: 13,
  }

  render() {
    const { alerts } = this.props
    const position = [this.state.lat, this.state.lng]

    console.log(alerts)
    return (
      <div className="alerts-map bg-dark">
        <Map center={position} zoom={this.state.zoom} className="w-100 h-100">
        <TileLayer
          attribution={stamenTonerAttr}
          url={stamenTonerTiles}
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>

      </div>
    )
  }
}

export default connect(state => ({

}), {

})(AlertsMap)
