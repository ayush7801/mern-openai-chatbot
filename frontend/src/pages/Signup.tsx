import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CustomizedInput from '../utils/customizedMuiComponents/CustomizedInput'
import { Constants } from '../constants/constants'
import { FiLogIn } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // if signed up then move to chat page
  useEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      return navigate('/chat');
    }
  }, [auth])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log('Signup form submitted')
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log(username, email, password)

    auth?.signup(username, email, password).then(() => {
      console.log('User signed up successfully');
    }).catch((err) => {
      console.log('Some error occurred while signing up user: ', err);
    });
  }

  return <>
    <Box width='100%' height ='90vh' pt={5} display='flex' justifyContent='space-evenly' alignItems='center' flex={1}>
      <Box display={'flex'} justifyContent='center' alignItems='center' flex={{xs: 1, md: 0.5}} padding={2}>
        <form 
        onSubmit={(e) => {handleSubmit(e)}}
        style={{display: 'flex', color:'white', justifyContent:'center', alignItems:'center', flexDirection: 'column', margin: 'auto', padding: '30px', boxShadow: "0px 0px 10px #ccc", border: 'none', borderRadius: '10px' }}>
          <Typography color={'#000'} variant='h4' textAlign={'center'} padding={2} fontWeight={600}>Welcome to {Constants.APP_NAME}</Typography>
          <CustomizedInput name='username' label='Name' type='text' />
          <CustomizedInput name='email' label='Email' type='email' />
          <CustomizedInput name='password' label='Password' type='password' />
          <Button type='submit' sx={{px:2, py: 1, mt:2, width: "100%", borderRadius: 2, bgcolor: "#ccc", color: '#fff', fontSize: '20px',':hover': {bgcolor: "#888888"}}} endIcon={<FiLogIn />} >
            Sign Up
          </Button>
          <Typography variant='h6' color={'#666'} sx={{marginTop: '3rem', fontSize: '1rem'}}>
            Already have an account? <Link to='/login' color='#111' style={{textDecoration: 'none', paddingLeft: '0.3rem'}}> Log in</Link>
          </Typography>
        </form>
      </Box>
    </Box>
  </>
}

export default Signup