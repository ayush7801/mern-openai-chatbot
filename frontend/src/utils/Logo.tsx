import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import './Logo.css'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './NavigationLink'

const Logo = () => {
    const auth = useAuth();
  return (
    <div style={{
        display: 'flex',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 'auto',
        gap: '8px',
    }}>
        <Link to={'/'} className='image-container'>
            <img src={'/dino-logo.png'} alt={'dino GPT logo'} style={{width: '30px', height: '30px'}} className='image-inverted'/>
        </Link>
        <Link to={'/'} style={{textDecoration: 'none'}}>
        <Typography variant='h6' className='text-inverted' sx={{
                display: {xs: 'none' ,sm: 'none', md: 'block'},
                mr: 'auto',
                fontWeight: '700',
                letterSpacing: '1px',
            }}>
                <span style={{fontSize: '22px'}}>D</span>ino-<span style={{color: '#00ff19'}}>GPT</span>
            </Typography>
        </Link>
        <div>
            { 
                auth?.isLoggedIn ? <>
                    <NavigationLink to='/chat' text='Go to chat' bg='#00fffc' textColor='black' />
                    <NavigationLink to='/' text='Logout' bg='#51538f' textColor='black' onClick={auth.logout} />
                </> : <>
                    <NavigationLink to='/login' text='LogIn' bg='#00fffc' textColor='black' />
                    <NavigationLink to='/signup' text='Signup' bg='#51538f' textColor='black' />
                </>
            }
        </div>
    </div>
  )
}

export default Logo