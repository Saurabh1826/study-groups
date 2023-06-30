const Course = require('../model/Course')
const Student = require('../model/Student')

const sendStudents = async (req, res) => {
    // courseId is the id of the course whose students we want to send
    const { courseId } = req.body
    
    // Get course courseId from the database 
    const course = await Course.findOne({ _id: courseId }).exec()
    // If course courseId does not exist send status 400
    if (!course)
        return res.sendStatus(400)
    
    try {
        const students = []
        for (const studentId of course.students) {
            const student = await Student.findOne({ _id: studentId }).exec()
            students.push({ firstName: student.firstName, lastName: student.lastName })
        }
        // const students = (course.students).map(async (studentId) => {
        //     const student = await Student.findOne({ _id: studentId }).exec()
        //     return { firstName: student.firstName, lastName: student.lastName }
        // })
        
        res.json(students)
    } catch(err) {
        res.send(500).json({ message: err.message })
    }

}


module.exports = { sendStudents }
