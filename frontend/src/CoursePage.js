import React, { useEffect } from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccessToken } from './features/accessToken/accessTokenSlice'

const CoursePage = () => {

  const accessToken = useSelector(selectAccessToken) || 
    (document.cookie).substring((document.cookie).indexOf('=') + 1)
  // const accessToken = useSelector(selectAccessToken) 
  
  const { courseId } = useParams()
  const { courseStudents, setCourseStudents, courseName, 
  setCourseName } = useContext(DataContext)
  
  // // Get students from the backend server
  let students = []
  let studentsItems = []

  useEffect(() => {

    const getStudents = async () => {
      // Create options object for the fetch request
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ courseId })
      }
      // Send the fetch request to the backend server
      try {
        // Get the students in the course
        let response = await fetch('http://localhost:3500/coursePage', fetchOptions)
        if (!response.ok) {
          // TODO: IMPLEMENT
        } else {
          students = await response.json()
        }
        // Get the course name of the course courseId
        response = await fetch('http://localhost:3500/getCourse', fetchOptions)
        if (!response.ok) {
          // TODO: IMPLEMENT
        } else {
          const body = await response.json()
          setCourseName(body.courseName)
        }
      } catch(err) {
        console.log(err.message)
      }
      // Update myCourses state
      setCourseStudents(students)
    }

    getStudents()

  }, [])
  
  studentsItems = courseStudents.map((student, index) => {
    return (<li key={index}>
      {student.firstName + ' ' + student.lastName}
    </li>)
  })

  return (
    <div className='CoursePage'>
      <div className='title'>Students in {courseName}</div>
      <ul className='myCoursesList'>
        {studentsItems}
      </ul>
    </div>
  )
}

export default CoursePage
