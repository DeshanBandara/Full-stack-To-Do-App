/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import '../../App.css'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import CreateTask from '../CreateTask/createTask'
import axios from 'axios'
import {BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencilSquare, BsClockHistory, BsCheck } from 'react-icons/bs'
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
      //Toggle the check property
      const updatedTodo = {...todo, check: !todo.check}
      //Update the backend data
      axios.put(`http://localhost:3001/select/${id}`, {check: updatedTodo.check})
      .then (result => {
        // If the API call is successful, update the state
        setTodos(todos => todos.map(todo => (todo._id === id ? updatedTodo : todo)))
      })
      .catch(err => console.log(err))

      return updatedTodo
    }
    return todo
  })
  setTodos(updatedTodos)
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

{/*const formattedDateTime = (dueDate) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dueDate));
};

console.log(formattedDateTime);
*/}

return (
  <div className='home'>
    <div>
    <h2>Welcome to your <span className='h2Span'>to-do list</span>  {/*userData.username*/}!</h2>
    </div>
      <div className='containerHome'>
        
        <div className='detailSection'>
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
          <div>
            <Link to={'/'}><button className='signOutBtn'>Sign Out</button></Link>
          </div>
        </div>
        
        <div className='tableContainer'>
          <table>
              <thead>
                  <tr>
                      <th>check</th>
                      <th></th>
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
                        <td></td>
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
                                <BsFillCheckCircleFill 
                                  className='iconChecked'
                                  /*style={{ fontSize: '24px', color: 'blue' }}*/
                                 />
                              :
                                <BsCircleFill className='iconNotChecked' />
                              }
                            </div>
                          </td>

                          <td>
                            <div className='taskStatus'>
                              <p style={{ color: todo.check ? "green" : "red"}} className='mrkStatus'>{todo.check ? <BsCheck className='selectionIcon' /> : <BsClockHistory className='selectionIcon' />}</p>
                            </div>
                          </td>
                          
                          <td>
                            <div>
                              <p>{todo.task}</p>
                            </div>
                          </td>

                          <td>
                            <div className='dateTime'>
                            {/*formattedDateTime(todo.dueDate)*/}
                              {new Date(todo.dueDate).toLocaleString()}
                              {/*<Datetime 
                                value = {todo.dueDate}
                                dateFormat = "YYYY-MM-DD  "
                                timeFormat="    HH:MM"
                                inputProps={{readOnly: true}}
                                className='dateTime'
                              />*/}
                            </div>
                            
                          </td>
                          <td>
                              <Link to={`/taskDetails/${todo._id}`}><BsPencilSquare className='iconPencil' /></Link>
                              <BsFillTrashFill 
                                onClick={() => handleDelete(todo._id)}
                                className='iconTrash'
                              />
                          </td>
                        </tr>
                      ))
                    }
              </tbody>
          </table>
        </div>
        
    </div>
  </div>
)
}

export default Home