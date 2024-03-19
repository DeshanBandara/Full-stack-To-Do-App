const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: String,
    status: String,
    description: String,
    dueDate: Date,
    check: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel