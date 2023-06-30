const Student = require('../model/Student')
const bcrypt = require('bcrypt')

const handleRegister = async (req, res) => {
    const { username, password, firstName, lastName } = req.body 

    // Check if a student with username already exists
    const duplicate = await Student.findOne({ username }).exec()
    // If there is a student with username, send status code 409
    if (duplicate) 
        return res.sendStatus(409)

    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        await Student.create({
            firstName,
            lastName,
            username,
            password: hashedPwd
        })
        res.sendStatus(201)
    } catch(err) {
        res.send(500).json({ message: err.message })
    }

}


module.exports = { handleRegister }