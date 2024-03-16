const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/user.js') //import user.js file
const { hash } = require("bcrypt")

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect('mongodb://127.0.0.1:27017/employee');

app.post('/Register', (req, res) => {
    const {name, email, password} =req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash})
        .then(user => res.json({status: "ok"}))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})

app.listen(3001, () =>{
    console.log("Server is Running");
})