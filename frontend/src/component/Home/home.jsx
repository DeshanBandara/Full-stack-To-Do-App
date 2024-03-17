/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './home.css'
import CreateTask from '../CreateTask/createTask'
import axios from 'axios'
import {BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill} from 'react-icons/bs'
//import '../../App.css'

const Home = () => {
  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    axios.get(`http://localhost:3001/get`)
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  }, [])

  //Select items using check box
  const handleSelect = (id) => {
    axios.put(`http://localhost:3001/select/${id}`)
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
  }

  //Delete Items
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
  }

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
              <div className='checkBox' onClick={() => handleSelect(todo._id)}>
                {todo.check ?
                  <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                :
                  <BsCircleFill className='icon' />
                }
                <p className={todo.check ? "line_trough" : ""}>{todo.task}</p>
              </div>
              <div>
                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default Home