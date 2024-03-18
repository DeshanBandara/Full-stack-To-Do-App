/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './createTask.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const CreateTask = () => {
  const [task, setTask] = useState()
  const [description, setDescription] = useState()
  const [dueDate, setDueDate] = useState()
  const navigate = useNavigate()

  //calling post method for create task
  const Submit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:3001/createTask`, {task: task, description: description, dueDate: dueDate})
    .then(result => {
      console.log(result)
      navigate('/Home')
    })
    .catch(err => console.log(err))
  }


  //Kalin eke
  const handleAdd = () => {
      axios.post(`http://localhost:3001/add`, {task: task})
      .then(result => {
          location.reload() //Automatically update the detail with clicking Add new task
      }) 
      .catch(err => console.log(err))
  }
  return (
    <div className='create_form'>
        <div id='create'>
          <div className='containerCreate'>
              <form onSubmit={Submit}>
                  <div>
                    <h2>Add Task</h2>
                    <Link to={'/Home'}><button>Back</button></Link>
                </div>
                  
                  <div className='addD'>
                      <label htmlFor='name'>Title</label>
                      <input type='text' placeholder='Enter name' className='formControl' onChange={(e) => setTask(e.target.value)} />
                  </div>
                  <div className='addD'>
                      <label htmlFor='email'>Description</label>
                      <input type='text' placeholder='Enter name' className='formControl' onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div className='addD'>
                      <label htmlFor='age'>Due Date</label>
                      <input type='text' placeholder='YYYY-MM-DD' className='formControl' onChange={(e) => setDueDate(e.target.value)} />
                  </div>
                  <button className='submitBtn'>Add</button>

              </form>
          </div>
        </div>
    </div>
  )
}

export default CreateTask