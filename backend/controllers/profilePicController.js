const Student = require('../model/Student')
const ObjectId = require('mongoose').Types.ObjectId
const Course = require('../model/Course')
const fs = require('fs')
const AWS = require('aws-sdk')
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const handleProfilePic = async (req, res) => {
    const { image, studentId } = req.body

    // Get student studentId from the database 
    const student = await Student.findOne({ _id: studentId }).exec()

    // Upload to S3 bucket
    const s3 = new AWS.S3()
    const bucketName = 'profile-pic-bucket1'
    const fileName = `${studentId}`

    // Set the S3 upload parameters
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: image,
        ContentType: 'image/jpeg', // Set the content type of the file
    }

    // Upload the picture to S3
    s3.upload(params, async (err, data) => {
        if (err) {
            console.error('Error uploading the picture:', err)
        } else {
            console.log('Picture uploaded successfully. URL:', data.Location)
            // Update Student record to include imgKey
            student.imgKey = data.key
            await student.save()
        }
    })
    
    
    // If course courseId does not exist send status 400
    if (!student)
        return res.sendStatus(400)

    try {
        res.send('success')
    } catch(err) {
        res.send(500).json({ message: err.message })
    }
}


module.exports = { handleProfilePic }
