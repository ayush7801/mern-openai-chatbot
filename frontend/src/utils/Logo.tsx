import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import './Logo.css'

const Logo = () => {
  return (
    <div style={{
        display: 'flex',
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
                fontWeight: '700',
                letterSpacing: '1px',
            }}>
                <span style={{fontSize: '22px'}}>D</span>ino-<span style={{color: '#00ff19'}}>GPT</span>
            </Typography>
        </Link>
    </div>
  )
}

export default Logo