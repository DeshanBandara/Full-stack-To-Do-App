/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './home.css'
import CreateTask from '../CreateTask/createTask'
import axios from 'axios'
import {BsCircleFill} from 'react-icons/bs'
//import '../../App.css'

const Home = () => {
  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    axios.get(`http://localhost:3001/get`)
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className='home'>
      <h2>To Do List</h2>
      <CreateTask />
      { todos.length === 0 
        ?
        <div><h2>No Records</h2></div>
        : //else display todos
          todos.map(todo => (
            <div className='todoItem' key={todo._id}>
              <div className='checkBox'>
                <BsCircleFill className='icon' />
                {todo.task}
              </div>
              
            </div>
          ))
      }
    </div>
  )
}

export default Home