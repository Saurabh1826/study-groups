const Student = require('../model/Student')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AWS = require('aws-sdk')
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

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
    console.log(student)

    
    // Get imageURL
    const bucketName = 'profile-pic-bucket1'
    // Create an S3 instance
    const s3 = new AWS.S3()
    // Get the object from S3
    s3.getObject({ Bucket: bucketName, Key: student.imgKey }, (err, data) => {
    if (err) {
        console.error('Error fetching image from S3:', err)
    } else {
        // Convert the data to a URL and set it to the state
        const url = URL.createObjectURL(new Blob([data.Body]))
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000, domain: 'localhost' })
    res.json({ accessToken, imgUrl: url })
    }
    })
}

module.exports = { handleLogin }