const Course = require('../model/Course')

const sendCourse = async (req, res) => {
    const { courseId } = req.body
    const course = await Course.findOne({ _id: courseId }).exec() 
    if (!course) 
        return res.sendStatus(400)
    res.json(course)
}


module.exports = { sendCourse }