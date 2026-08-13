import React from 'react'
import Navbar from './navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { Box } from '@mui/material'

const HeroPage = () => {
  return (
    <div>
        <Navbar />
        {/* this is where children pages will show */}
        
        <Outlet />
      </div>
  )
}

export default HeroPage