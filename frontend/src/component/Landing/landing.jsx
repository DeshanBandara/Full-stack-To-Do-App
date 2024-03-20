/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import '../../App.css'
import {Link} from 'react-router-dom'
import Bg from '../../assets/2371075.webp'

const Landing = () => {
  return (
    <section id='landing'>
        <div className='landingContainer'>
            <div className='landingContent'>
                <span className='hello'>Hello,</span>
                <span className='landingText'>What's <span className='landingName'>Next?</span></span>
                <p className='landingPara'>This is your to-do application. Now you can manage your works with your todo app.</p>
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