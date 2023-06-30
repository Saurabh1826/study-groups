import React, { useEffect } from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import { useSelector } from 'react-redux'
import { selectAccessToken } from './features/accessToken/accessTokenSlice'

const AddCourse = () => {

  const navigate = useNavigate()

  const accessToken = useSelector(selectAccessToken) || 
    (document.cookie).substring((document.cookie).indexOf('=') + 1)
  
  // Get studentId from the access token
  let studentId = ''
  if (accessToken)
    studentId = jwt(accessToken).studentId

  const { allCourses, setAllCourses, addCourse,
  setAddCourse, handleAddCourse } = useContext(DataContext)

  // Get all courses from the server
  useEffect(() => {

    // Verify that the user is logged in (ie: has an access token)
    if (!accessToken)
      return navigate('/')

    const getAllCourses = async () => {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
      const response = await fetch('http://localhost:3500/getAllCourses', fetchOptions)
      if (!response.ok) {
        return navigate('/')
      } else {
        const body = await response.json()
        setAllCourses(body)
      }
    }
    getAllCourses()
  }, [])

  // Filter the courses to display based on the search field addCourse
  const coursesToDisplay = allCourses.filter(course => 
    (course.courseName).includes(addCourse))

  // Create the list of courses to display
  const list = coursesToDisplay.map((course, index) => {
    return (<li key={index}>
      <div>
        <div>{course.courseName}</div>
        <Link to='/myCourses'>
          <div 
            className='addCourseButton'
            onClick={() => handleAddCourse(studentId, course._id)}
          >Add Course</div>
        </Link>
      </div>
    </li>)
  })
  

  return (
    <div className='AddCourse'>
      <form className='searchBar' onSubmit={e => e.preventDefault()}>
        <input
          type='text'
          value={addCourse}
          onChange={e => setAddCourse(e.target.value)}
        ></input>
      </form>
      {list}
    </div>
  )
}

export default AddCourse
