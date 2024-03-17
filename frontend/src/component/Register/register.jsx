/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:3001/Register`, {name, email, password})
    .then(res => {
      navigate('/Login')
    })
    .catch(err => console.log(err))
  }

  return (
    <section id='register'>
      <div className='containerRegister'>
        <div>
          <h2 className='registerH2'>Register</h2>
          <hr className='registerHr' />
          <form className='registerForm' onSubmit={handleSubmit}>
            <div className='registerDiv'>
              <label className='nameLabel' htmlFor='name'>Name</label>
              <input
                type='text'
                placeholder='Enter Name'
                autoComplete='off'
                name='name'
                className='inputName'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='registerDiv'>
              <label className='emailLabel' htmlFor='email'>Email</label>
              <input
                type='text'
                placeholder='Enter Email'
                autoComplete='off'
                name='email'
                className='inputEmail'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='registerDiv'>
              <label className='passwordLabel' htmlFor='name'>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                autoComplete='off'
                name='password'
                className='inputPassword'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='registerFormBtn' type='submit'>Register</button>
            <p className='registerPara'>Already have an account</p>
            <Link to={'/Login'}><button className='registerToLoginBtn'>Login</button></Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register