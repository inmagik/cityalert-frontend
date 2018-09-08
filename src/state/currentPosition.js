import request from 'superagent'
import { createSelector } from 'reselect'
import { put, call } from 'redux-saga/effects'

const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION'

export const getCurrentPosition = (state => {
  return state.currentPosition
})

const obtainPos = () => new Promise((resolve) => {
  window.navigator.geolocation.getCurrentPosition((position) => {
    resolve(position)
  })
})

const reverseGeo = (lat, lon) =>
  request.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    .then(({ body }) => body)

function *retrieveCurrentPosition() {
  const position = yield call(obtainPos)
  const reverse = yield call(reverseGeo, position.coords.latitude, position.coords.longitude)

  yield put({
    type: SET_CURRENT_POSITION,
    payload: {
      reverse,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    },
  })
}

function *saga() {
  yield retrieveCurrentPosition()
}

const reducer = (prevState = null, { type, payload }) => {
  if (type === SET_CURRENT_POSITION) {
    return payload
  }
  return prevState
}

export {
  reducer,
  saga,
}
