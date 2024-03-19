/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, SetConfirmPassword] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    //Check whether fill all field
    if(!name || !email || !password || !confirmPassword){
      setError('Please fill in all field')
      return
    }
    //Check whether the email type correct or not
    if (!validateEmail(email)) {
      setError('Please enter a valid email address!')
      return
    }
    //Confirm password correctness
    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return;
    }
    //Call backend API to register user
    axios.post(`http://localhost:3001/Register`, {name, email, password})
    .then(res => {
      if (res.data.error) {
        setError('Email address is already registered')
      } else {
        navigate('/Login')
      }
    })
    .catch(err => console.log(err))
  }

  //Check whether the email type correct or not
  const validateEmail = (email) => {
    //Email validation expression
    const re = /\S+@\S+\.\S+/
    return re.test(email)
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

            <div className='registerDiv'>
              <label className='passwordLabel' htmlFor='name'>Password</label>
              <input
                type='password'
                placeholder='Confirm Password'
                autoComplete='off'
                name='password'
                className='inputPassword'
                onChange={(e) => SetConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className='error'>{error}</p>}

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