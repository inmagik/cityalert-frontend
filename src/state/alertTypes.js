import request from 'superagent'
import { rj } from 'redux-rocketjump'
import { withToken, authApiCall } from './auth'

export const {
  actions: {
    load: loadAlertTypes,
  },
  selectors: {
    getData: getAlertTypes,
  },
  saga,
  reducer,
} = rj({
  type: 'GET_ALERT_TYPES',
  state: 'alertTypes',
  callApi: authApiCall,
  api: t => (params) => withToken(t, request.get(`/api/alert-types`))
    .query(params)
    .then(({ body }) => body)
})()
