import { Avatar, Box, Button, IconButton, MenuItem, Select, Typography } from '@mui/material'
import { MdOutlineArrowUpward } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Constants } from '../constants/constants';
import { red } from '@mui/material/colors';
import ChatItem from '../components/ChatItem';

import './Chats.css'
import { sendChatRequest } from '../apiCalls/userApiCalls';

type partsType = {
  text: string;
}

type chatMessagesType = {
  role: "user" | "model";
  parts: partsType[];
}

const Chats = () => {
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<chatMessagesType[]>([]);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const userMessage = messageInputRef.current?.value as string;
    if(messageInputRef && messageInputRef.current) {
      messageInputRef.current.value = '';
    }
    if (userMessage.length === 0){
      toast('Please enter a message', {icon: '🤦‍♂️'});
      return;
    };
    const newMessage: chatMessagesType = {role: 'user', parts: [{text: userMessage}]};
    setChatMessages([...chatMessages, newMessage]);
    
    // Send message to backend
    const response = await sendChatRequest(userMessage);
    if(response instanceof Error){
      toast('Some error occurred while sending chat request', {icon: '😢'});
      return;
    }
    const chats = response.chats as chatMessagesType[];
    setChatMessages(chats);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      handleSubmit();
    }
  }

  return (
    <Box sx={{display: 'flex', width: '100%', height: '100%', flex: 1}}>
      <Box sx={{display: {md: 'flex', sm: 'none', xs: 'none'}, flex: 0.2, flexDirection: 'column'}}>
        <Box sx={{display: 'flex', width: '100%', height: '90vh', bgcolor: '#F8F6F4', flexDirection: 'column', alignItems: 'center'}}>
          <Avatar sx={{color: 'black', bgcolor: 'white', mx: 'auto', my: 2, fontWeight: 700}}>
            {auth?.user?.name[0].toUpperCase() + '' + auth?.user?.name[1].toUpperCase()}
          </Avatar>
          <Typography variant='h6' sx={{color: 'rgb(110, 110, 110)', mx: 'auto', fontWeight: 'bold', fontFamily: 'work sans'}}>
            You are talking to AI
          </Typography>
          <Typography sx={{color: 'rgb(160, 160, 160)', mx: 'auto', ml: 2, fontFamily: 'work sans', fontStyle: 'italic',p: 3}}>
            {Constants.AI_DISCLAIMER}
          </Typography> 
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1}}>
            <Button sx={{width: '16rem', height: '3rem', mb: 3, color: 'white', fontWeight: '700', borderRadius: 3, mx: 3, bgcolor: red[400], ":hover": { bgcolor: red.A100 }}}>
              Clear Conversation
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flex: {md: 0.8, sm: 1, xs: 1}, flexDirection: 'column', mx: 3, height: '90vh'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1}}>
          <Select defaultValue={'GPT-3.5-Turbo'} label="AImodel" id="named-select" name="demo-select" sx={{bgcolor: '#fff', color: 'black', width: '10rem', height: '2.5rem', borderRadius: 2, borderColor: '#a2a0a0'}}>
            <MenuItem value={"GPT-3.5-Turbo"} sx={{bgcolor: '#fff', color: 'black'}}>GPT-3.5-Turbo</MenuItem>
            <MenuItem value={"GPT-4.0-Turbo"} sx={{bgcolor: '#fff', color: 'black'}}>GPT-4.0-Turbo</MenuItem>
          </Select>
        </Box>
        <Box sx={{width: '100%', flex: 1, borderRadius: 3, mx: 'auto', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth'}}>
          {chatMessages.map((chat, index) => <ChatItem role={chat.role as "user" | "model"} content={chat.parts[0].text} key={index}/>)}
        </Box>
        <Box sx={{display: 'flex', flex: 0.1, m: 3, justifyContent: 'center', alignItems: 'flex-end'}}>
          <Box className='chat-container' sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
            <input type='text' ref={messageInputRef} className='chat-input' placeholder='Message GPT' onKeyUp={handleKeyPress}></input>
            <MdOutlineArrowUpward className='enter-input-button' onClick={handleSubmit} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Chats