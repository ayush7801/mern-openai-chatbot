import { Box, Button, Typography } from '@mui/material'
import CustomizedInput from '../utils/customizedMuiComponents/CustomizedInput'
import { FiLogIn } from "react-icons/fi";
import { Constants } from '../constants/constants';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // if logged in then move to chat page
  useEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      return navigate('/chat');
    }
  }, [auth])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log('Login form submitted')
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log(email, password)
    try {
      await auth?.login(email, password);
    }
    catch (err) {
      console.log('Some error occurred while logging in user: ', err);
    }
  }

  return (
    <Box width='100%' height ='90vh' pt={5} display='flex' justifyContent='space-evenly' alignItems='center' flex={1}>
      <Box display={'flex'} justifyContent='center' alignItems='center' flex={{xs: 1, md: 0.5}} padding={2}>
        <form 
        onSubmit={(e) => {handleSubmit(e)}}
        style={{display: 'flex', color:'white', justifyContent:'center', alignItems:'center', flexDirection: 'column', margin: 'auto', padding: '30px', boxShadow: "0px 0px 10px #ccc", border: 'none', borderRadius: '10px' }}>
          <Typography color={'#000'} variant='h4' textAlign={'center'} padding={2} fontWeight={600}>LogIn to {Constants.APP_NAME}</Typography>
          <CustomizedInput name='email' label='Email' type='email' />
          <CustomizedInput name='password' label='Password' type='password' />
          <Button type='submit' sx={{px:2, py: 1, mt:2, width: "100%", borderRadius: 2, bgcolor: "#ccc", color: '#fff', fontSize: '20px',':hover': {bgcolor: "#888888"}}} endIcon={<FiLogIn />} >
            LogIn
          </Button> 
          <Typography variant='h6' color={'#666'} sx={{marginTop: '3rem', fontSize: '1rem'}}>
            Don't have an account? <Link to='/signup' color='#111' style={{textDecoration: 'none', paddingLeft: '0.3rem'}}>Sign up</Link>
          </Typography>
        </form>
      </Box>
    </Box>
  )
}

export default Login