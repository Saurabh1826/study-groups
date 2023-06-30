import React from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'
import { Link } from 'react-router-dom'

const Login = () => {

    // TODO: IF USER IS LOGGED IN, REDIRECT FROM HERE TO APPROPRIATE MYCOURSES PAGE

    const { username, setUsername, password, setPassword, 
        handleLoginSubmit } = useContext(DataContext)


    return (
        <div className='Login'>
            <div className='background'>
                Login
                <form className='loginForm' onSubmit={ handleLoginSubmit }>
                    <label htmlFor='username'>Username:</label>
                    <input
                        id='username'
                        type='text'
                        required
                        value={ username }
                        onChange={e => setUsername(e.target.value)}
                    ></input>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        type='text'
                        required
                        value={ password }
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                    <button type='submit'>Log In</button>
                </form>
                <Link to='/register'>Don't Have An Account? Register Here</Link>
            </div>
        </div>
    )
}

export default Login
