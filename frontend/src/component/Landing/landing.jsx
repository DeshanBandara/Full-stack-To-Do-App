/* eslint-disable no-unused-vars */
import React from 'react'
//import './landing.css'
import '../../App.css'
import {Link} from 'react-router-dom'
import Bg from '../../assets/2371075.webp'

const Landing = () => {
  return (
    <section id='landing'>
        <div className='landingContainer'>
            <div className='landingContent'>
                <span className='hello'>Hello,</span>
                <span className='landingText'>This is <span className='landingName'>To Do App</span></span>
                <p className='landingPara'>Now you can manage your works as you go.</p>
                <div className='btnContainer'>
                    <Link to={'/Register'}><button className='registerBtn'>Register</button></Link>
                    <Link to={'/Login'}><button className='loginBtn'>Login</button></Link>
                </div>
            </div>
            <img src={Bg} alt='homeImage' className='bg' />
        </div>
    </section>
  )
}

export default Landing