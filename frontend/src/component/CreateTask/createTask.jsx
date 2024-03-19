/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './createTask.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const CreateTask = () => {
  const [task, setTask] = useState('')
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  //calling post method for create task
  const handleSubmit = (e) => {
    e.preventDefault()
    //Error handling
    if(!task || !status || !description || !dueDate) {
      setError('please Fill in all fields!')
    } else {
      setError('')
      axios.post(`http://localhost:3001/createTask`, {task: task, status: status, description: description, dueDate: dueDate})
      .then(result => {
        console.log(result)
        navigate('/Home')
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className='create_form'>
        <div id='create'>
          <div className='containerCreate'>

              <div>
                <Link to={'/Home'}><button>Back</button></Link>
              </div>

              <form onSubmit={handleSubmit}>
                  <div>
                    <h2>Add Task</h2>
                  </div>

                  
                  {error && <div className='error'>{error}</div>}
                  
                  <div className='addD'>
                      <label htmlFor='name'>Task Title</label>
                      <input type='text' placeholder='Enter name' className='formControl' onChange={(e) => setTask(e.target.value)} />
                  </div>

                  <div className='addD'>
                      <label htmlFor='name'>Status</label>
                      <input type='text' placeholder='Enter status' className='formControl' onChange={(e) => setStatus(e.target.value)} />
                  </div>

                  <div className='addD'>
                      <label htmlFor='email'>Description</label>
                      <textarea type='text' placeholder='Enter description' className='formControl' onChange={(e) => setDescription(e.target.value)} />
                  </div>

                  <div className='addD'>
                      <label htmlFor='age'>Due Date</label>
                      <Datetime
                        value={dueDate}
                        onChange={(date) => setDueDate(date)}
                        inputProps={{ placeholder: 'Select Date and Time' }}
                      />
                  </div>

                  <button className='submitBtn'>Add</button>
              </form>
          </div>
        </div>
    </div>
  )
}

export default CreateTask