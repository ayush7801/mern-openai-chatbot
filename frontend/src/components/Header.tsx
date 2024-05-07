import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from '../utils/Logo'

const Header = () => {
  return (
    <AppBar sx={{bgcolor: '#102C57', position: 'static', boxShadow: 'none'}}>
      <Toolbar>
        <Logo />
      </Toolbar>
    </AppBar>
  )
}

export default Header