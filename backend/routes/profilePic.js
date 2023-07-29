const express = require('express')
const profilePicController = require('../controllers/profilePicController')
const router = express.Router()

router.post('/', profilePicController.handleProfilePic)

module.exports = router

