import request from 'superagent'
import { rj } from 'redux-rocketjump'
import { withToken, authApiCall } from './auth'
import combineRjs from 'redux-rocketjump/plugins/combine'
import rjWithPromise from 'redux-rocketjump/plugins/promise'
import { makeUpdateReducer } from 'redux-rocketjump/plugins/hor'

export const {
  connect: {
    list: {
      actions: {
        load: loadSimilarAlerts,
      },
      selectors: {
        getData: getSimilarAlerts,
      },
    },
  },
  saga,
  reducer,
} = combineRjs({

  list: rj(rjWithPromise, {
    type: 'GET_SIMILAR_ALERTS',
    composeReducer: [
      makeUpdateReducer('VOTE_ALERT'),
    ],
    api: t => (alert) => withToken(t, request.post(`/api/similar-alerts/`))
        .send(alert)
        .then(({ body }) => body)
  }),

}, {
  state: 'similarAlerts',
  callApi: authApiCall,
})
