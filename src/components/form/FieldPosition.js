import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Label } from 'reactstrap'
import { loadSearchLocation, getSearchLocation } from '../../state/geocoding'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { getCurrentPosition } from '../../state/currentPosition'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class FieldPosition extends React.PureComponent {
  state = {
    modalOpen: false,
  }

  toggleOpen = () => this.setState({modalOpen: !this.state.modalOpen})

  search = (e) => {
    this.props.loadSearchLocation(e.target.value)
  }

  choosePlace = place => () => {
    const { input, searchLocation } = this.props
    const { value, onChange } = input
    console.log(100, place)
    onChange({
      location: place.display_name,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
    })
    this.toggleOpen()
  }

  render(){
    const { input, searchLocation } = this.props
    const { value, onChange } = input
    const { modalOpen } = this.state


    return (
      <React.Fragment>
        <div className='mb-2'>
          <div>
            <Label>Posizione</Label>
          </div>
          <small>{value.location}</small>
          <div style={{height: 300}}>
            {value && <Map center={[value.latitude, value.longitude]} zoom={14} className="w-100 h-100">
            <TileLayer
              attribution={stamenTonerAttr}
              url={stamenTonerTiles}
            />
            <Marker position={[value.latitude, value.longitude]}>

            </Marker>
            </Map>}
          </div>

          <div>
            <small>{value.latitude}, {value.longitude}</small>
          </div>

          <button
            type={'button'}
            onClick={this.toggleOpen}
            className='btn btn-primary btn-sm'>Cerca indirizzo <i className='fa fa-search' /></button>
        </div>
        <Modal isOpen={modalOpen} toggle={this.toggleOpen}>
          <div className="p-4">
            <h5>Cerca indirizzo</h5>
            <small>
              La ricerca è limitata al Comune di Bergamo
            </small>
          </div>
          <ModalBody>

            <div className="form-group">
              <input type="text" className="form-control" onChange={this.search}>
              </input>
              <div>
                {searchLocation && searchLocation.length > 0 && searchLocation.map((place, i) => (
                  <div className="d-flex flex-row" key={i}>
                    {place.display_name}
                    <button
                      onClick={this.choosePlace(place)}
                      type="button" className="btn btn-sm">o</button>
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  searchLocation: getSearchLocation(state)
})
export default connect(mapStateToProps, {loadSearchLocation})(FieldPosition)
