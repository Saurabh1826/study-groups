import React from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Register = () => {


  const { newUsername, setNewUsername, newPassword, setNewPassword, 
    handleRegisterSubmit, firstName, setFirstName, lastName, 
    setLastName } = useContext(DataContext)

  return (
    <div className='Register'>
        <div className='background'>
            Register
            <form className='registerForm' onSubmit={ handleRegisterSubmit }>
                <label htmlFor='username'>Username:</label>
                <input
                    id='username'
                    type='text'
                    required
                    value={ newUsername }
                    onChange={e => setNewUsername(e.target.value)}
                ></input>
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    type='text'
                    required
                    value={ newPassword }
                    onChange={e => setNewPassword(e.target.value)}
                ></input>
                <label htmlFor='firstName'>First Name:</label>
                <input
                    id='firstName'
                    type='text'
                    required
                    value={ firstName }
                    onChange={e => setFirstName(e.target.value)}
                ></input>
                <label htmlFor='lastName'>Last Name:</label>
                <input
                    id='lastName'
                    type='text'
                    required
                    value={ lastName }
                    onChange={e => setLastName(e.target.value)}
                ></input>
                <button type='submit'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register
