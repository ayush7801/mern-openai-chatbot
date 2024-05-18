import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { forwardRef } from 'react';

type ChatItemProps = {
  role: "user" | "model"; 
  content: string;
  width?: string;
  height?: string;
  overflowY?: string;
}

const ChatItem = forwardRef<HTMLDivElement, ChatItemProps>(({ role, content, width, height, overflowY }, ref) => {
  const auth = useAuth();
  return role === "model" ? <>
        <Box sx={{display: 'flex', p: 1, gap: 2, alignItems: 'center', width: `${width}`, height: `${height}`, overflowY: `${overflowY}` }} ref={ref}>
          <Avatar sx={{ml: 0}}>
            <img src='openai.png' alt='openAIimage' width={"30px"}></img>
          </Avatar>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography sx={{fontSize: '1rem', color: 'black', fontFamily: 'work sans'}}>{content}</Typography>
          </Box>
        </Box>
      </> 
      : <>
        <Box sx={{bgcolor: '#e9e9e9', borderRadius: '1rem' , display: 'flex', p: 1, gap: 2, alignItems: 'center', width: `${width}`, height: `${height}`, overflowY: `${overflowY}` }} ref={ref}>
          <Avatar sx={{ml: 0, bgcolor: 'black', color: 'white'}}>
            {auth?.user?.name[0].toUpperCase() + '' + auth?.user?.name[1].toUpperCase()}
          </Avatar>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography sx={{fontSize: '1rem', color: 'black', fontFamily: 'work sans'}}>{content}</Typography>
          </Box>
        </Box>
      </>
});

export default ChatItem