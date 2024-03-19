/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import '../../App.css'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const TaskDetails = () => {
    const {id} = useParams()
    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState(null)
    const [status, setStatus] = useState('')
    const [check, setCheck] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    

    useEffect(() => {
        axios.get(`http://localhost:3001/getTask/${id}`)
        .then(result => {
            console.log(result.data)
            const { task, status, description, dueDate, check } = result.data
            setTask(task)
            setStatus(status)
            setDescription(description)
            setDueDate(new Date(dueDate)) //Convert string to date object
            setCheck(check ? 'Complete' : 'Not Complete')
        })
        .catch(err => console.log(err))
    }, [id])

    const Update = (e) => {
        e.preventDefault()
        if(!task || !status || !description || !dueDate){
            setError('Please Fill in all fields!')
        } else {
            axios.put(`http://localhost:3001/updateTask/${id}`, {task, status, description, dueDate})
            .then(result => {
                console.log(result)
                location.reload()
            })
            .catch(err => console.log(err))
        }
        
    }

    //Delete Items
const handleDelete = () => {
    axios.delete(`http://localhost:3001/deleteTask/${id}`)
    .then(result => {
    navigate('/Home')
    })
    .catch(err => console.log(err))
}

return (
    <div id='create'>
        <div className='containerCreate'>
                <div>
                <Link to={'/Home'}><button>Back</button></Link>
                </div>

            <form onSubmit={Update}>
                <div>
                    <h2>Task Details</h2>
                </div>

                {error && <div className='error'>{error}</div>}

                <div className='addD'>
                    <h3 style={{color: check === 'Complete' ? 'green' : 'red'}}>{check}</h3>
                </div>
                
                <div className='addD'>
                    <label htmlFor='name'>Title</label>
                    <input type='text' placeholder='Enter Task' className='formControl' value={task || ''} onChange={(e) => setTask(e.target.value)}/>
                </div>

                <div className='addD'>
                    <label htmlFor='status'>Status</label>
                    <input type='text' placeholder='Enter Status' className='formControl' value={status || ''} onChange={(e) => setStatus(e.target.value)}/>
                </div>

                <div className='addD'>
                    <label htmlFor='email'>Description</label>
                    <textarea type='text' placeholder='Enter description' className='formControl' value={description  || ''} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className='addD'>
                    <label htmlFor='age'>Due Date</label>
                    <Datetime
                        value={dueDate}
                        onChange={(date) => setDueDate(date)}
                        inputProps={{ placeholder: 'Select Date and Time' }}
                    />
                </div>
                <button className='submitBtn'>Update</button>
                <button className='submitBtn' onClick={() => handleDelete(todos._id)}>Delete</button>
            </form>
        </div>
        </div>
)
}

export default TaskDetails