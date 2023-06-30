const Student = require('../model/Student')
const Course = require('../model/Course')

const sendCourses = async (req, res) => {
    const { studentId } = req.body
    
    // Get student studentId from the database 
    const student = await Student.findOne({ _id: studentId }).exec()
    // If course courseId does not exist send status 400
    if (!student)
        return res.sendStatus(400)

    try {
        const courses = []
        for (const courseId of student.courses) {
            const course = await Course.findOne({ _id: courseId }).exec()
            courses.push(course)
        }
        // const courses = (student.courses).map(async (courseId) => {
        //     const course = await Course.findOne({ _id: courseId }).exec()
        //     return { courseName: course.courseName }
        // })
        
        res.json(courses)
    } catch(err) {
        res.send(500).json({ message: err.message })
    }
}


module.exports = { sendCourses }
