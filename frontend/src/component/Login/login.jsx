/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './login.css'

const Login = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <section id='login'>
      <div className='containerLogin'>
        <div>
          <h2 className='loginH2'>Login</h2>
          <hr className='loginHr' />
          <form className='loginForm'>
            <div className='loginDiv'>
              <label className='emailLabel' htmlFor='email'>Email</label>
              <input
                type='text'
                placeholder='Enter Email'
                autoComplete='off'
                name='email'
                className='emailInput'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className='passwordLabel' htmlFor='name'>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                autoComplete='off'
                name='password'
                className='passwordInput'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='submitBtn' type='submit'>Login</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login