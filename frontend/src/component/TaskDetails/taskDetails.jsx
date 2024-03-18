/* eslint-disable no-unused-vars */
import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'

const taskDetails = () => {
  return (
    <div id='create'>
          <div className='containerCreate'>
              <form >
                  <h2>Task Details</h2>
                  <div className='addD'>
                      <label htmlFor='name'>Title</label>
                      <input type='text' placeholder='Enter name' className='formControl' />
                  </div>
                  <div className='addD'>
                      <label htmlFor='email'>Description</label>
                      <input type='text' placeholder='Enter name' className='formControl' />
                  </div>
                  <div className='addD'>
                      <label htmlFor='age'>Due Date</label>
                      <input type='text' placeholder='Enter name' className='formControl' />
                  </div>
                  <div className='addD'>
                      <label htmlFor='status'>Status</label>
                      <p>Add the status if that home page check box task as </p>
                  </div>

                  <Link to='/Update'><button className='submitBtn'>Edit</button></Link>
                  <button className='submitBtn'>Thwama mukuth ne</button>
                  <button className='submitBtn'>Delete</button>

              </form>
          </div>
        </div>
  )
}

export default taskDetails