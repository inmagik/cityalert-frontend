import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'
import { makeAppsReducers, makeAppsSaga } from 'redux-rocketjump'
import * as auth from './auth'
import * as currentPosition from './currentPosition'
import * as alerts from './alerts'
import * as alertTypes from './alertTypes'

// Where i see it? hhehe eheh
const APPS = {
  auth,
  currentPosition,
  alerts,
  alertTypes,
}

const rootReducer = combineReducers({
  // HOOK for other reducers like redux-form...
  form: formReducer,
  ...makeAppsReducers(APPS),
})

const mainSaga = makeAppsSaga(APPS)

const preloadedState = undefined
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
  )
)

sagaMiddleware.run(mainSaga)

export default store
