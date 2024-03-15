/* eslint-disable no-unused-vars */
import React from 'react'
import './landing.css'
import {Link} from 'react-scroll'
import Bg from '../../assets/image1.jpeg'

const Landing = () => {
  return (
    <section id='landing'>
        <div className='landingContainer'>
            <div className='landingContent'>
                <span className='hello'>Hello,</span>
                <span className='landingText'>This is <span className='landingName'>To Do App</span></span>
                <p className='landingPara'>Now you can manage your works as you go.</p>
                <div className='btnContainer'>
                    <Link><button className='registerBtn'>Register</button></Link>
                    <Link><button className='loginBtn'>Login</button></Link>
                </div>
            </div>
            <img src={Bg} alt='homeImage' className='bg' />
        </div>
    </section>
  )
}

export default Landing