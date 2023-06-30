import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Nav = () => {

  const { handleLogout } = useContext(DataContext)

  return (
    <nav className='Nav'>
      <ul>
          <li><Link to='/myCourses/'>My Courses</Link></li>
        <li><Link to='/addCourse/'>Add a Course</Link></li>
        <li onClick={handleLogout}><Link to=''>Logout</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
