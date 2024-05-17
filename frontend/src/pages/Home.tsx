import { Box, Button } from '@mui/material'
import React from 'react'
import TypingAnimation from '../utils/TypingAnimation'

import './Home.css'

const Home = () => {
  return <>
    <Box className='home-container' width={'100%'} height={'100%'}>
      <Box sx={{display: 'flex', width: '100%', height: '84.4vh', flexDirection: 'row', alignContent: 'center', mx: 'auto', mt: '3rem'}}>
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 8}}>
          <Box sx={{width: '100%', display:'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', flex: 1}}><TypingAnimation /></Box>
          <Box sx={{display: 'flex', gap: 5, alignItems: 'flex-start', justifyContent: 'space-evenly', flex: 1}}>
            <Button variant='outlined' sx={{width: '10rem', height: '3rem', color: '#666', borderColor: '#999', borderRadius: '1rem', ':hover':{color: 'white', bgcolor: '#999', borderColor: '#999'}}} href='/login'>Log in</Button>
            <Button variant='contained' sx={{width: '10rem', height: '3rem', color: 'white', backgroundColor: '#999', borderRadius: '1rem', ':hover':{bgcolor: '#333'}}} href='/signup'>Sign up</Button>
          </Box>
        </Box>
        <Box sx={{flex: 1, display: {md:'flex', sm: 'none', xs: 'none'}, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          {/* <img src='walle.png' alt='Robot homepage image' style={{objectFit: 'contain', position: 'relative', top: '-18%'}}></img> */}
          <div className='gif-container'><video autoPlay muted loop id="background-video">
            <source src="moon.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
        </video></div>
        </Box>
      </Box>  
    </Box>    
  </>
}

export default Home