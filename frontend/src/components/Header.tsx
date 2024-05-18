import { AppBar, Toolbar } from '@mui/material'
import Logo from '../utils/Logo'
import NavigationLink from '../utils/NavigationLink'
import { useAuth } from '../context/AuthContext'

// box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor: '#cccccc', boxShadow: 'none', position: 'static'}}>
      <Toolbar>
        <Logo />
        <div>
            { 
                auth?.isLoggedIn ? <>
                    <NavigationLink to='/chat' text='Go to chat' bg='#fff' textColor='black' />
                    <NavigationLink to='/' text='Logout' bg='#fff' textColor='black' onClick={auth.logout} />
                </> : <>
                    <NavigationLink to='/login' text='LogIn' bg='#fff' textColor='black' />
                    <NavigationLink to='/signup' text='Signup' bg='#fff' textColor='black' />
                </>
            }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header