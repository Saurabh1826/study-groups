const express = require('express')
const mongoose = require('mongoose')
const cors =  require('cors')
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3500

connectDB()

// Middleware
// app.use(credentials)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser({ limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))

// Routes
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/profilePic', require('./routes/profilePic'))
app.use(verifyJWT)
app.use('/addCourse', require('./routes/addCourse'))
app.use('/coursePage', require('./routes/coursePage'))
app.use('/deleteCourse', require('./routes/deleteCourse'))
app.use('/myCourses', require('./routes/myCourses'))
app.use('/getAllCourses', require('./routes/getAllCourses'))
app.use('/getCourse', require('./routes/getCourse'))



mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})


process.on('uncaughtException', err => {
    console.error(`Uncaught exception: ${err}`)
    process.exit(1)
})
