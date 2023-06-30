const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    courseName: String,
    students: {type: [String], default: []}
})

module.exports = mongoose.model('Course', courseSchema)