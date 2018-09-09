import L from 'leaflet';
import icons from 'leaflet-fa-markers'
import get from 'lodash/get'

export const responsesStatuses = [
  'accepted', 'resolved', 'invalid'
]


export const statusToColor = {
  'accepted': 'orange',
  'resolved': 'teal',
  'invalid': 'crimson',
}

export const getAlertColor = (request) => {
  const status = get(request, 'response.status')
  const color = statusToColor[status] || 'deepskyblue'
  return color
}

export const makeIcon = (request) => {
  const color = getAlertColor(request)

  const icon  = L.icon.fontAwesome({
  	iconClasses: 'fa fa-info-circle', // you _could_ add other icon classes, not tested.
  	markerColor: color,
  	iconColor: '#FFF' })
  return icon

}
