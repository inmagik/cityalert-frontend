import { put, call } from 'redux-saga/effects'

const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION'

const obtainPos = () => new Promise((resolve) => {
  window.navigator.geolocation.getCurrentPosition((position) => {
    resolve(position)
  })
})

function *getCurrentPosition() {
  const position = yield call(obtainPos)
  yield put({
    type: SET_CURRENT_POSITION,
    payload: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    },
  })
}

function *saga() {
  yield getCurrentPosition()
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
