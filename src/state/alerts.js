import request from 'superagent'
import { rj } from 'redux-rocketjump'
import { withToken, authApiCall } from './auth'

export const {
  actions: {
    load: loadAlerts,
  },
  selectors: {
    getData: getAlerts,
  },
  saga,
  reducer,
} = rj({
  type: 'GET_ALERTS',
  state: 'alerts',
  callApi: authApiCall,
  api: t => (params) => withToken(t, request.get(`/api/alerts`))
      .query(params)
})()
