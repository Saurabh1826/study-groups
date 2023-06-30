const Course = require('../model/Course')
const Student = require('../model/Student')

const handleDeleteCourse = async (req, res) => {
    const { studentId, courseId } = req.body 

    // Find the course with courseId and the student with studentId
    const course = await Course.findOne({ _id: courseId }).exec()
    const student = await Student.findOne({ _id: studentId }).exec()
    // If the student studentId or the course courseId does not exist, send 
    // status code 400. Also, if student.courses does not contain courseId, send 
    // status code 400
    if (!course || !student || !(student.courses).includes(courseId))
        return res.sendStatus(400)

    try {
        // Remove courseId from student.courses and remove studentId from 
        // course.students
        course.students = (course.students).filter(id => id !== studentId)
        student.courses = (student.courses).filter(id => id !== courseId)
        await course.save()
        await student.save()
        res.sendStatus(204)
    } catch(err) {
        res.send(500).json({ message: err.message })
    }
}




module.exports = { handleDeleteCourse }