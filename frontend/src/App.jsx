/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './component/Landing/landing' //Landing component
import Register from './component/Register/register' //Register component
import Login from './component/Login/login'
import Dashboard from './component/Dashboard/dashboard'
import Home from './component/Home/home'
import Create from './component/CreateTask/createTask'
import Update from './component/UpdateTask/updateTask'
import TaskDetails from './component/TaskDetails/taskDetails'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Landing} />
        <Route path='/Register' Component={Register} />
        <Route path='/Login' Component={Login} />
        <Route path='/Dashboard' Component={Dashboard} />
        <Route path='/Home' Component={Home} />
        <Route path='/Create' Component={Create} />
        <Route path='/Update' Component={Update} />
        <Route path='/taskDetails/:id' Component={TaskDetails} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
