import React, { useState, useEffect } from 'react'
import AWS from 'aws-sdk'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Header = ({ title }) => {

  const { imageURL } = useContext(DataContext)

  return (
      <header className='Header'>
        { title }
        <img width={10} height={10} src={imageURL} alt="S3 Image" />
      </header>
  )
}

export default Header
