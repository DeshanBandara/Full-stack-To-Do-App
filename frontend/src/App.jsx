/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './component/Landing/landing' //Landing component
import Register from './component/Register/register' //Register component
import Login from './component/Login/login'
import Dashboard from './component/Dashboard/dashboard'
import Home from './component/Home/home'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Landing} />
        <Route path='/Register' Component={Register} />
        <Route path='/Login' Component={Login} />
        <Route path='/Dashboard' Component={Dashboard} />
        <Route path='/Home' Component={Home} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
