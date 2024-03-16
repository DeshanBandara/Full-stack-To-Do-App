const express = require("express") //Imports the express framework
const mongoose = require("mongoose") //Imports Mongoose, an object data modeling library for MongoDB and Node.js.
const cors = require("cors") //Imports CORS (Cross-Origin Resource Sharing) middleware for enabling cross-origin requests.
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser') //Imports cookie-parser middleware for parsing cookies in HTTP requests.
const UserModel = require('./models/user.js') //import user.js file
const bcrypt = require('bcrypt'); //Imports bcrypt for hashing passwords.
const { hash } = require("bcrypt")

const app = express()
app.use(express.json())
app.use(cors({
    origin: [`http://localhost:5173`], //access to the frontend side trough this link
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

//MongoDB database link
mongoose.connect('mongodb://127.0.0.1:27017/employee');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decode) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if(decode.role === "admin") {
                    next()
                } else {
                    return res.json("Not admin")
                }
            }
        })
    }
}

//Call middleware to verify the user
app.get('/dashboard', verifyUser, (req, res) => {
    res.json("Success")
})

app.post('/Register', (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash})
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})

//API for Login
app.post('/Login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({email: user.email, role: user.role}, 
                        "jwt-secret-key", {expiresIn: '1d'})
                        //store the cookie
                        res.cookie('token', token)
                        return res.json({Status: 'Success', role: user.role})
                } else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No Record Existed")
        }
    })
})

app.listen(3001, () => {
    console.log("Server is Running");
})