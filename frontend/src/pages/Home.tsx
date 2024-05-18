import { Box, Button, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import TypingAnimation from '../utils/TypingAnimation'
import { MdOutlineArrowUpward } from 'react-icons/md'

import './Home.css'
import './Chats.css'
import toast from 'react-hot-toast'
import ChatItem from '../components/ChatItem'
import { getDummyResponse } from '../apiCalls/userApiCalls'

const Home = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [aimessage, setAimessage] = useState<string>("")

  const handleSubmit = async () => {
    const userMessage = inputRef.current?.value as string;
    if(inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    if (userMessage.length === 0){
      toast('Please enter a message', {icon: '🤦‍♂️'});
      return;
    };
    toast.loading('Sending chat request...', {icon: '🚀', duration: 2000})
    // Send message to backend
    const response = await getDummyResponse(userMessage);
    if(response instanceof Error){
      toast('Some error occurred while sending chat request', {icon: '😢'});
      return;
    }
    const chatResponse = response.message as string;
    toast.success('Success', {icon: '😊'})
    setAimessage(chatResponse);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'  && e.target instanceof HTMLInputElement && e.target.type !== 'select-one'){
      handleSubmit();
    }
  }

  return <>
    <Box className='home-container' width={'100%'} height={'100%'}>
      <Box sx={{display: 'flex', width: '100%', height: '84.4vh', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mx: 'auto', mt: '3rem'}}>
        <Box sx={{maxHeight: '50vh', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 8}}>
          <Box sx={{width: '100%', display:'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', flex: 1}}>
            <TypingAnimation />
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, flex: 1, m: 3, justifyContent: 'center', alignItems: 'center'}}>
            {aimessage !== "" && <ChatItem role={'model'} content={aimessage} height={'3.5rem'} overflowY={'hidden'}/>}
            <Box className='chat-container' sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
              <input type='text' ref={inputRef} className='chat-input' placeholder='Message GPT' onKeyUp={handleKeyPress}></input>
              <MdOutlineArrowUpward className='enter-input-button' onClick={handleSubmit} />
            </Box>
          </Box>
          <Box sx={{display: 'flex', gap: 5, alignItems: 'flex-start', justifyContent: 'space-evenly', flex: 1}}>
            <Button variant='outlined' sx={{width: '10rem', height: '3rem', color: '#666', borderColor: '#999', borderRadius: '1rem', ':hover':{color: 'white', bgcolor: '#999', borderColor: '#999'}}} href='/login'>Log in</Button>
            <Button variant='contained' sx={{width: '10rem', height: '3rem', color: 'white', backgroundColor: '#999', borderRadius: '1rem', ':hover':{bgcolor: '#333'}}} href='/signup'>Sign up</Button>
          </Box>
        </Box>
        <Box sx={{flex: 1, display: {md:'flex', sm: 'none', xs: 'none'}, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '84.4vh'}}>
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