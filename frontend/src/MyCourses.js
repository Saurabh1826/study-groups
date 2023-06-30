import React, { useEffect } from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccessToken } from './features/accessToken/accessTokenSlice'
import jwt from 'jwt-decode'

const MyCourses = () => {

  const navigate = useNavigate()

  const accessToken = useSelector(selectAccessToken) || 
    (document.cookie).substring((document.cookie).indexOf('=') + 1)
  // const accessToken = useSelector(selectAccessToken) 

  
  const { myCourses, setMyCourses, myCourse,
  setMyCourse } = useContext(DataContext)
  
  // Get courses from the backend server
  let courses = []
  let coursesItems = []

  useEffect(() => {
    // Verify that the user is logged in (ie: has an access token)
    if (!accessToken)
      return navigate('/')
    
    // Get studentId from the access token
    const studentId = jwt(accessToken).studentId
    
    const getCourses = async () => {
      // Create options object for the fetch request
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ studentId })
      }
      // Send the fetch request to the backend server
      try {
        const response = await fetch('http://localhost:3500/myCourses', fetchOptions)
        if (!response.ok) {
          return navigate('/')
        } else {
          courses = await response.json()
        }
      } catch(err) {
        console.log(err.message)
      }
      // Update myCourses state
      setMyCourses(courses)
    }
    getCourses()
  }, [])

  // Filter myCourses based on the myCourse search field
  let coursesToDisplay = myCourses.filter(course =>
    (course.courseName).includes(myCourse))

  coursesItems = coursesToDisplay.map((course, index) => {
    return (<li key={index}>
      <Link to={`/coursePage/${course._id}`}>{course.courseName}</Link>
    </li>)
  })

  return (
    <div className='MyCourses'>
      <div className='title'>{accessToken ? `${jwt(accessToken).firstName}'s Courses` : ''}</div>
      <form className='searchBar' onSubmit={e => e.preventDefault()}>
        <input
          type='text'
          value={myCourse}
          onChange={e => setMyCourse(e.target.value)}
        ></input>
      </form>
      <ul className='myCoursesList'>
        {coursesItems}
      </ul>
    </div>
  )
}

export default MyCourses
