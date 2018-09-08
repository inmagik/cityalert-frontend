import request from 'superagent'
import { rj } from 'redux-rocketjump'
import { withToken, authApiCall } from './auth'
import combineRjs from 'redux-rocketjump/plugins/combine'

export const {
  connect: {
    list: {
      actions: {
        load: loadAlerts,
      },
      selectors: {
        getData: getAlerts,
      },
    },
    create: {
      actions: {
        load: createAlert,
      },
    }
  },
  saga,
  reducer,
} = combineRjs({

  list: rj({
    type: 'GET_ALERTS',
    api: t => (params) => withToken(t, request.get(`/api/alerts/`))
        .query(params)
        .then(({ body }) => body)
  }),

  create: rj({
    state: false,
    type: 'CREATE_ALERT',
    api: t => (params) => withToken(t, request.post(`/api/alerts/`))
        .send(params)
        .then(({ body }) => body)
  })

}, {
  state: 'alerts',
    callApi: authApiCall,
})
