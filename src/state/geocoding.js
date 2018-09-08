import { fork } from 'redux-saga/effects'
import request from 'superagent'
import { combineReducers } from 'redux'
import { rj } from 'redux-rocketjump'

// Namespace for actions
const NS = '@geocoding/'

// actions
const SEARCH = `${NS}SEARCH`

const viewBox = `9.6006,45.6666,9.7328,45.7335`

// SEARCH
export const {
  actions: {
    load: loadSearchLocation,
    unload: stopSearchLocation,
  },
  selectors: {
    getData: getSearchLocation,
    isLoading: getSearchLocationLoading,
  },
  reducer: searchLocationReducer,
  saga: searchLocationSaga,
} = rj({
  type: SEARCH,
  state: 'geocoding.search',
  api: q => request.get(`https://nominatim.openstreetmap.org/search/?street=${q}&format=json&viewbox=${viewBox}&bounded=1`)
    .then(({ body }) => body)
})()

export const reducer = combineReducers({
  search: searchLocationReducer,
})

export const saga = function *() {
  yield fork(searchLocationSaga)
}
