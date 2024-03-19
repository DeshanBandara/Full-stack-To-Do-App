/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  const [error, setError] = useState()

  axios.defaults.withCredentials = true; // To connect with backend cookies

  const handleSubmit = (e) => {
    e.preventDefault()

    //Check whether fill all field
    if(!email || !password ) {
      setError('Please fill in all field!')
      return
    }
    //Call backend API to register user
    axios.post(`http://localhost:3001/Login`, {email, password})
    .then(res => {
      //console.log(res.data)
      //navigate('/Login')
      if (res.data.Status === "Success") {
        //Store user name in local storage
        localStorage.setItem('userData', JSON.stringify({
          username: res.data.username,
        }))
        if (res.data.role === "admin") {
          navigate('/Dashboard')
        } else {
          navigate('/Home')
        }
      } else {
        setError('Invalid email address or password!')
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <section id='login'>
      <div className='containerLogin'>
        <div>
          <h2 className='loginH2'>Login</h2>
          <hr className='loginHr' />
          <form className='loginForm' onSubmit={handleSubmit}>
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
              <label className='passwordLabel' htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                autoComplete='off'
                name='password'
                className='passwordInput'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className='error'>{error}</p>}
            <button className='submitBtn' type='submit'>Login</button>
            <p className='loginPara'>Don't have an account</p>
            <Link to={'/Register'}><button className='loginToRegisterBtn'>Register</button></Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login