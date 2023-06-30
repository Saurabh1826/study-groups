const express = require('express')
const getCourseController = require('../controllers/getCourseController')
const router = express.Router()

// This route returns a course given the course id
router.post('/', getCourseController.sendCourse)

module.exports = router

