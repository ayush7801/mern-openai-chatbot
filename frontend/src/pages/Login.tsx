import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import CustomizedInput from '../utils/customizedMuiComponents/CustomizedInput'

const Login = () => {
  return (
    <Box width='100%' height ='100vh' pt={5} display='flex' justifyContent='space-evenly' alignItems='center' flex={1}>
      <Box justifyContent='center' alignItems='center' display={{md: 'flex', sm: 'none', xs: 'none'}}>
        <img src='./airobot.png' alt='AI Robot Image' style={{width: '300px'}}></img>
      </Box>
      <Box display={'flex'} justifyContent='center' alignItems='center' flex={{xs: 1, md: 0.5}} padding={2}>
        <form style={{display: 'flex', color:'white', justifyContent:'center', alignItems:'center', flexDirection: 'column', margin: 'auto', padding: '30px', boxShadow: "0px 0px 10px #DAC0A3", border: 'none', borderRadius: '10px' }}>
          <Typography color={'#000'} variant='h4' textAlign={'center'} padding={2} fontWeight={600}>LogIn</Typography>
          <CustomizedInput name='email' label='Email' type='email' />
          <CustomizedInput name='password' label='Password' type='password' />
          <Button type='submit' sx={{px:2, py: 1, mt:2, width: "100%", borderRadius: 2, bgcolor: "#DAC0A3", color: '#FEFAF6', fontSize: '20px',':hover': {bgcolor: "#FEFAF6", color: "#DAC0A3"}}}>
            LogIn
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default Login