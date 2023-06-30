const Student = require('../model/Student')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const { username, password } = req.body 
    if (!username || !password)
        return res.sendStatus(400)
    
    const student = await Student.findOne({ username }).exec()
    if (!student)
        return res.sendStatus(401)
    const match = await bcrypt.compare(password, student.password)
    if (!match) {
        res.sendStatus(401)
    }
    
    const accessToken = jwt.sign(
        { 
            "studentId": student._id,
            "username": student.username,
            "firstName": student.firstName
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '10m' }
    )
    const refreshToken = jwt.sign(
        { 
            "studentId": student._id,
            "username": student.username,
            "firstName": student.firstName
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '1d' }
    )
    student.refreshToken = refreshToken
    await student.save()

    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000, domain: 'localhost' })
    res.json({ accessToken })
}

module.exports = { handleLogin }