const express = require('express')
const deleteCourseController = require('../controllers/deleteCourseController')
const router = express.Router()

router.post('/', deleteCourseController.handleDeleteCourse)

module.exports = router

