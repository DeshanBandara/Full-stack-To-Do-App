/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import '../../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

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
      <div className='container'>
          <div>
            <Link to={'/'}><button className='backBtn'><BsArrowLeft /></button></Link>
          </div>
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='fields'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                placeholder='Enter Email'
                autoComplete='off'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='fields'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                autoComplete='off'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className='error'>{error}</p>}<br/>
            <button className='formBtn' type='submit'>Login</button><br/>
            <div>
            {/*<Link to={'/Register'}><button className='formBtn'>Register</button></Link>
            <p className='formPara'>Don't have an account</p>*/}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login