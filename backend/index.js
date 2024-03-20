const express = require("express") //Imports the express framework
const mongoose = require("mongoose") //Imports Mongoose, an object data modeling library for MongoDB and Node.js.
const cors = require("cors") //Imports CORS (Cross-Origin Resource Sharing) middleware for enabling cross-origin requests.
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser') //Imports cookie-parser middleware for parsing cookies in HTTP requests.
const UserModel = require('./models/user.js') //import user.js file
const TodoModel = require('./models/todo.js')
const bcrypt = require('bcrypt'); //Imports bcrypt for hashing passwords.
const { hash } = require("bcrypt")

// Enable all HTTP methods for cors
const app = express()
app.use(express.json())
app.use(cors({
    origin: [`http://localhost:5173`], //access to the frontend side trough this link
    methods: ["GET", "POST", "PUT","DELETE"],
    credentials: true
}))
app.use(cookieParser())

// Connection with the MongoDB database
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
//Create the get API
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

//Create the get API for ToDo
app.get('/get', (req, res) => {
    TodoModel.find() //All the data
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

//Api for create new task
app.post('/add', (req, res) => {
    const task = req.body.task
    TodoModel.create({
        task: task
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

//Api for select items (Root handler)
app.put(`/select/:id`, (req, res) => {
    const {id} = req.params;

    TodoModel.findById(id)
    .then(todo => {
        todo.check = !todo.check; //Toggle the check property
        return todo.save()
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

//API for Delete items
app.delete(`/delete/:id`, (req, res) => {
    const {id} = req.params

    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

//-----------------------------------------------------------------------------------------------------
//Create API for create task
app.post(`/createTask`, (req, res) => {
    TodoModel.create(req.body)
    .then(result => req.json(result))
    .catch(err => res.json(err))
})

app.get(`/getTask/:id`, (req, res) => {
    const id = req.params.id;

    TodoModel.findById({_id: id})
    .then(results =>  res.json(results))
    .catch(err => res.json(err))
})

app.put('/updateTask/:id', (req, res) => {
    const id = req.params.id
    TodoModel.findByIdAndUpdate({_id: id},
        {
            task: req.body.task,
            status: req.body.status,
            description: req.body.description,
            dueDate: req.body.dueDate,
        },
        {new: true} // This ensures that the updated document is returned
        )
    .then(users => res.json(results))
    .catch(err => res.json(err))
})

app.delete('/deleteTask/:id', (req, res) => {
    const id = req.params.id

    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running on port 3001");
})