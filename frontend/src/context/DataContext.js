import { createContext, useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { change } from "../features/accessToken/accessTokenSlice";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectAccessToken } from '../features/accessToken/accessTokenSlice'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const accessToken = useSelector(selectAccessToken) || 
        (document.cookie).substring((document.cookie).indexOf('=') + 1)
    // const accessToken = useSelector(selectAccessToken)

    // States for the username and password fields of the login form on the login
    // page
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // States for new username/password and firstName/lastName fields of the register form on the 
    // register page
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    // State for the search field on the myCourses page
    const [myCourse, setMyCourse] = useState('')
    // State for the search field on the addCourse page
    const [addCourse, setAddCourse] = useState('')
    // State of the students in the current course 
    const [courseStudents, setCourseStudents] = useState([])
    // State of the courses for the current student
    const [myCourses, setMyCourses] = useState([])
    // State for all courses in the database
    const [allCourses, setAllCourses] = useState([])
    // State for the course name to display in the CoursePage component
    const [courseName, setCourseName] = useState('')

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }
        try {
            const response = await fetch('http://localhost:3500/login', fetchOptions)
            if (!response.ok) {
                // TODO: IMPLEMENT
            }
            const body = await response.json()
            // Update accessToken in the redux store
            dispatch(change(body.accessToken))
            // Set accessToken cookie 
            document.cookie = `accessToken=${body.accessToken}`
            // Redirect to 'My Courses' page
            navigate('/myCourses')
        } catch(err) {
            // TODO: IMPLEMENT
        }

        // Reset all fields of the register form
        setUsername('')
        setPassword('')
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: newUsername,
                password: newPassword,
                firstName,
                lastName
            })
        }
        try {
            const response = await fetch('http://localhost:3500/register', fetchOptions)
            if (!response.ok) {
                // TODO: IMPLEMENT
            }
            // Navigate to login page
            navigate('/')
        } catch(err) {
            // TODO: IMPLEMENT
        }

        // Reset all fields of the register form
        setNewUsername('')
        setNewPassword('')
        setFirstName('')
        setLastName('')
    }

    const handleAddCourse = async (studentId, courseId) => {
        if (!studentId || !courseId) return

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ studentId, courseId })
        }
        try {
            const response = await fetch('http://localhost:3500/addCourse', fetchOptions)
            if (!response.ok) {
                // TODO: IMPLEMENT
            }
        } catch(err) { 
            // TODO: IMPLEMENT
        }
    }

    const handleLogout = () => {
        // Clear the accessToken in the redux store
        dispatch(change(''))
        // Clear the accessToken cookie
        document.cookie = `accessToken=${accessToken}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    }


    return (
        <DataContext.Provider value={{
            username, setUsername, password, setPassword, newUsername,
            setNewUsername, newPassword, setNewPassword, myCourse, setMyCourse,
            addCourse, setAddCourse, courseStudents, setCourseStudents, myCourses, setMyCourses, handleLoginSubmit, handleRegisterSubmit, allCourses,
            setAllCourses, handleAddCourse, courseName, setCourseName, firstName,
            setFirstName, lastName, setLastName, handleLogout
        }}>
            {children}
        </DataContext.Provider>
    )
}


export default DataContext
