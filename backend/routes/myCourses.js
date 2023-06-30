const express = require('express')
const myCoursesController = require('../controllers/myCoursesController')
const router = express.Router()

router.post('/', myCoursesController.sendCourses)

module.exports = router

