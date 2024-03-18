/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './home.css'
import '../../App.css'
import CreateTask from '../CreateTask/createTask'
import axios from 'axios'
import {BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

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
        <div className='containerUsers'>
          <div>
            <h2>To Do List</h2>
            <Link to={'/'}><button>Sign Out</button></Link>
          </div>
          <Link to='/Create'><button className='addBtn'>Add +</button></Link>
          <table className='UserTable'>
              <thead>
                  <tr>
                      <th>check</th>
                      <th>Task</th>
                      <th>Due Date</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                    {todos.length === 0
                    ?
                      <tr>
                        <td><BsCircleFill className='icon' /></td>
                        <td>No Record</td>
                        <td>No Record</td>
                        <td>No Record</td>
                      </tr>
                    :
                      todos.map((todo) => (
                        <tr key={todo._id}>
                          <td>
                            <div className='checkBox' onClick={() => handleSelect(todo._id)}>
                              {todo.check ?
                                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                              :
                                <BsCircleFill className='icon' />
                              }
                            </div>
                          </td>
                          <td className={todo.check ? "line_trough" : ""}>{todo.task}</td>
                          <td className={todo.check ? "line_trough" : ""}>{todo.dueDate}</td>
                          <td>
                              <Link to={`/taskDetails/${todo._id}`}><button className='editBtn'>Details</button></Link>
                              <button className='deleteBtn' onClick={() => handleDelete(todo._id)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    }
              </tbody>
          </table>
      </div>

    </div>
  )
}

export default Home