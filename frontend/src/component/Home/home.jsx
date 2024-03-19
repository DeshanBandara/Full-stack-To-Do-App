  /* eslint-disable no-unused-vars */
  import React, { useEffect, useState } from 'react'
  import './home.css'
  import '../../App.css'
  import Datetime from 'react-datetime';
  import 'react-datetime/css/react-datetime.css';
  import CreateTask from '../CreateTask/createTask'
  import axios from 'axios'
  import {BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill} from 'react-icons/bs'
  import { Link, useNavigate } from 'react-router-dom'

  //import '../../App.css'

  const Home = () => {
    const [todos, setTodos] = useState([])
    const [userData, setUserData] = useState({})
    const [searchTerm, setSearchTerms] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')

    //Get user name from local storage
    useEffect(() => {
      const storedUserData = localStorage.getItem('userData')
      if(storedUserData) {
        setUserData(JSON.parse(storedUserData))
      }
    }, [])
    
    useEffect(() => {
      axios.get(`http://localhost:3001/get`)
      .then(result => {
        //setTodos(result.data)
        const updatedTodos = result.data.map(todo => ({
          ...todo,
          dueDate: new Date(todo.dueDate)
        }))
        setTodos(updatedTodos)
      })
      .catch(err => console.log(err))
    }, [])

    //Select items using check box
    const handleSelect = (id) => {
      const updatedTodos = todos.map(todo => {
        if (todo._id === id) {
          return {
            ...todo,
            check: !todo.check //if todo.check is true it becomes false, and vise versa
          }
        }
        return todo
      })
      axios.put(`http://localhost:3001/select/${id}`)
      .then (result => {
        setTodos(updatedTodos)
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

    //Filter todos based on status
    const filteredTodos = todos.filter(todo => {
      if (statusFilter === 'All') {
        return true;
      } else if (statusFilter === "Complete") {
        return todo.check
      } else {
        return !todo.check;
      }
    })

    //Filter todos based on status Task Title
    const searchedTodos = filteredTodos.filter(todo =>
      todo.task && todo.task.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className='home'>
        <div>
        <h2>Welcome, {userData.username}!</h2>
        </div>
          <div className='containerUsers'>
            <div>
              <h3>To Do List</h3>
              <Link to={'/'}><button>Sign Out</button></Link>
            </div>
            <div>
              <Link to='/Create'><button className='addBtn'>Add +</button></Link>

              {/*Search */}
              <input 
                type='text'
                placeholder='Search by title'
                value={searchTerm}
                onChange={(e) => setSearchTerms(e.target.value)}
              />

              {/*Search */}
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Complete">Complete</option>
                <option value="Not Complete">Not Complete</option>
              </select>
            </div>
            
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
                            
                            <td>
                              <p>{todo.task}</p>
                              <p style={{ color: todo.check ? "green" : "red"}}>{todo.check ? "Complete" : "Not Complete"}</p>
                            </td>

                            <td>
                              <Datetime 
                                value = {todo.dueDate}
                                dateFormat = "YYYY-MM-DD  "
                                timeFormat="    HH:MM"
                                inputProps={{readOnly: true}}
                              />
                            </td>
                            <td>
                                <Link to={`/taskDetails/${todo._id}`}><button className='editBtn'>Details</button></Link>
                                <button className='deleteBtn' onClick={() => handleDelete(todo._id)}><BsFillTrashFill /></button>
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