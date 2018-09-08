import request from 'superagent'
import { rj } from 'redux-rocketjump'
import { withToken, authApiCall } from './auth'
import combineRjs from 'redux-rocketjump/plugins/combine'
import rjUpdate from 'redux-rocketjump/plugins/update'
import rjWithPromise from 'redux-rocketjump/plugins/promise'
import { makeUpdateReducer } from 'redux-rocketjump/plugins/hor'

function getBase64(file) {
  return new Promise(resolve => {
     var reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function () {
       resolve(reader.result);
     };
     reader.onerror = function (error) {
       console.log('Error: ', error);
     };
  })
}

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

  create: rj(rjWithPromise, {
    state: false,
    type: 'CREATE_ALERT',
    api: t => ({ ...params, image }) =>
    getBase64(image).then((image64) => {
      withToken(t, request.post(`/api/alerts/`))
          .send({
            ...params,
            image: image64,
          })
        .then(({ body }) => body)
    })
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
