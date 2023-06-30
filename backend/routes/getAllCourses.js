const express = require('express')
const getAllCoursesController = require('../controllers/getAllCoursesController')
const router = express.Router()

router.get('/', getAllCoursesController.sendCourses)

module.exports = router

