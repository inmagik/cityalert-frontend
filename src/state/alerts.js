import request from 'superagent'
import { rj } from 'redux-rocketjump'
import { withToken, authApiCall } from './auth'
import combineRjs from 'redux-rocketjump/plugins/combine'
import rjUpdate from 'redux-rocketjump/plugins/update'
import { makeUpdateReducer } from 'redux-rocketjump/plugins/hor'

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
    },
    vote: {
      actions: {
        update: voteAlert,
      },
    }
  },
  saga,
  reducer,
} = combineRjs({

  list: rj({
    type: 'GET_ALERTS',
    composeReducer: [
      makeUpdateReducer('VOTE_ALERT'),
    ],
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
  }),

  vote: rj(rjUpdate(), {
    type: 'VOTE_ALERT',
    api: t => ({ id }) => withToken(t, request.post(`/api/vote-alert/${id}/`))
      .then(({ body }) => body)
  })

}, {
  state: 'alerts',
    callApi: authApiCall,
})
