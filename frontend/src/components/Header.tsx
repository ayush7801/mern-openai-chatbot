import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from '../utils/Logo'
import NavigationLink from '../utils/NavigationLink'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor: '#102C57', boxShadow: 'none'}}>
      <Toolbar>
        <Logo />
        <div>
            { 
                auth?.isLoggedIn ? <>
                    <NavigationLink to='/chat' text='Go to chat' bg='#EADBC8' textColor='black' />
                    <NavigationLink to='/' text='Logout' bg='#FEFAF6' textColor='black' onClick={auth.logout} />
                </> : <>
                    <NavigationLink to='/login' text='LogIn' bg='#EADBC8' textColor='black' />
                    <NavigationLink to='/signup' text='Signup' bg='#FEFAF6' textColor='black' />
                </>
            }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header