const Student = require('../model/Student')
const Course = require('../model/Course')

const handleAddCourse = async (req, res) => {
    // studentId is the id of the student to whose course list we should add the 
    // course with id courseId
    const { studentId, courseId } = req.body

    // Find the course with courseId and the student with studentId
    const course = await Course.findOne({ _id: courseId }).exec()
    const student = await Student.findOne({ _id: studentId }).exec()
    // If the student studentId or the course courseId does not exist, send 
    // status code 400
    if (!course || !student)
        return res.sendStatus(400)
    // If the student studentId already has courseId in student.courses, send 
    // status code 409
    if ((student.courses).includes(course._id))
        return res.sendStatus(409)
    
    // Add course to student's course list and add student to course's students 
    // list
    try {
        student.courses = [...student.courses, course._id]
        course.students = [...course.students, student._id]
        await student.save()
        await course.save()
        res.sendStatus(201)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { handleAddCourse }

