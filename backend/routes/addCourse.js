const express = require('express')
const addCourseController = require('../controllers/addCourseController')
const router = express.Router()

router.post('/', addCourseController.handleAddCourse)

module.exports = router

