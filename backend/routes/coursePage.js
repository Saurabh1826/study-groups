const express = require('express')
const coursePageController = require('../controllers/coursePageController')
const router = express.Router()

router.post('/', coursePageController.sendStudents)

module.exports = router

