import { Box, Button } from "@mui/material"

const Fallback = () => {
  return (
    <Box sx={{display:'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 3}}>
      <div>OOPS!! the endpoint does not exists or either you are not authorized to access it. Try Signing up</div>
      <Button variant='contained' sx={{width: '10rem', height: '3rem', color: 'white', backgroundColor: '#999', borderRadius: '1rem', ':hover':{bgcolor: '#333'}}} href='/signup'>Sign up</Button>  
    </Box>
  )
}

export default Fallback