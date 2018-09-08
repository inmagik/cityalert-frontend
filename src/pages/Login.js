import React from 'react'
import { withAuthLogin } from 'eazy-auth'
import withFullPage from '../hocs/withFullPage'

const Login = ({ handleSubmit, credentials: { email, password }, error, loading }) => (
  <div className='full-form-page'>
    <div className='full-form-container'>
      <form className='full-form' onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            {...email}
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder='Email'
          />
        </div>

        <div className="form-group">
          <input
            {...password}
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder='Password'
          />
        </div>

        {error && <div className='alert alert-danger'>Credenziali errate.</div>}

        <button type='submit' disabled={loading} className='btn btn-primary'>
          Login
          {loading && '...'}
        </button>
      </form>
    </div>
  </div>
)

export default withAuthLogin({
  credentials: ['email', 'password'],
})(withFullPage()(Login))
