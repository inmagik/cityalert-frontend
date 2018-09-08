import { makeAuthFlow, makeAuthReducer } from 'eazy-auth'
import request from 'superagent'

// Inject token in Authorization header when provided
export const withToken = (token, baseRequest) =>
  (token ? baseRequest.set('Authorization', `JWT ${token}`) : baseRequest)

const login = ({ email, password }) =>
  request.post('/auth/token-auth/')
    .send({ email, password })
    .then(({ body }) => ({
      access_token: body.token,
      refresh_token: body.token,
    }))

const me = (token) =>
  withToken(token, request.get('/auth/me/'))
    .then(({ body }) => body)

const { authFlow, authApiCall } = makeAuthFlow({
  meCall: me,
  loginCall: login,
})

const reducer = makeAuthReducer()

export {
  authFlow as saga,
  authApiCall,
  reducer,
}
