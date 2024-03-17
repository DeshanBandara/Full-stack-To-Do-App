/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './createTask.css'
import axios from 'axios'

const CreateTask = () => {
    const [task, setTask] = useState()
    const handleAdd = () => {
        axios.post(`http://localhost:3001/add`, {task: task})
        .then(result => console.log(result.data))
        .catch(err => console.log(err))
    }
  return (
    <div className='create_form'>
        <input type='text' placeholder='Enter new task' onChange={(e) => setTask(e.target.value)}/>
        <button type='submit' onClick={handleAdd}>Add New Task</button>
    </div>
  )
}

export default CreateTask