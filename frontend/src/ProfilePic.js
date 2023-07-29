import React, { useEffect } from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import { useSelector } from 'react-redux'
import { selectAccessToken } from './features/accessToken/accessTokenSlice'
import { useState } from 'react'
import axios from 'axios';

const ProfilePic = () => {

  const navigate = useNavigate()

  const accessToken = useSelector(selectAccessToken) || 
    (document.cookie).substring((document.cookie).indexOf('=') + 1)
  
  // Get studentId from the access token
  let studentId = ''
  if (accessToken)
    studentId = jwt(accessToken).studentId

  // Get all courses from the server
  useEffect(() => {
    // Verify that the user is logged in (ie: has an access token)
    if (!accessToken)
      return navigate('/')
  }, [])


  const [image, setImage] = useState(null)

  // Function to handle the file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Function to handle image upload to the backend
  const handleImageUpload = () => {
    if (image) {
      axios.post('http://localhost:3500/profilePic', { image, studentId })
        .then((response) => {
          console.log('Image uploaded successfully:', response.data);
          // Add any additional logic or UI updates after a successful upload here.
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          // Handle any error scenarios or display error messages here.
        });
    }
  };


  return (
    <div className='ProfilePic'>
      <h2>Upload a Picture</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Uploaded" style={{ width: '300px', marginTop: '10px' }} />}
      <button onClick={handleImageUpload} disabled={!image}>
        Upload Image
      </button>
    </div>
  )
}

export default ProfilePic
