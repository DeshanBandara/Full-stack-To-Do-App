/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './component/Landing/landing' //Landing component
import Register from './component/Register/register' //Register component
import Login from './component/Login/login'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Landing} />
        <Route path='/Register' Component={Register} />
        <Route path='/Login' Component={Login} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
