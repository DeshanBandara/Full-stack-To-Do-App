/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './dashboard.css'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [suc, setSuc]  = useState()
  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get(`http://localhost:3001/dashboard`)
    .then(res => {
      if (res.data === "Success") {
        setSuc("Succeeded Ok")
      } else {
        navigate('/Login')
        //navigate('/Landing')
      }
    })
    .catch(err => console.log(err))
  }, [navigate])

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{suc}</p>
    </div>
  )
}

export default Dashboard