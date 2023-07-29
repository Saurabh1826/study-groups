const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    refreshToken: { type: String, default: '' },
    courses: { type: [String], default: [] },
    imgKey: { type: String, default: '' }
})

module.exports = mongoose.model('Student', studentSchema)