import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
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

class AlertStaticMap extends PureComponent {


  render() {
    const { alert } = this.props
    if(!alert || !alert.position){
      return null
    }

    const position = alert.position.coordinates.lice().reverse()

    console.log("position", position)

    return (
      <div className="alert-static-map bg-dark">
        <Map center={position} zoom={13} className="w-100 h-100">
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

})(AlertStaticMap)
