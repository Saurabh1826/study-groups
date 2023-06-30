const Course = require('../model/Course')

const sendCourses = async (req, res) => {
    const courses = await Course.find()
    res.json(courses)
}

module.exports = { sendCourses }