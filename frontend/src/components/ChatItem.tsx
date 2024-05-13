import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

type ChatItemProps = {
  role: "user" | "model"; 
  content: string;
}

const ChatItem = ({ role, content }: ChatItemProps) => {
  const auth = useAuth();
  return role === "model" ? <>
        <Box sx={{display: 'flex', p: 1, gap: 2, alignItems: 'center' }}>
          <Avatar sx={{ml: 0}}>
            <img src='openai.png' alt='openAIimage' width={"30px"}></img>
          </Avatar>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography sx={{fontSize: '1rem', color: 'black', fontFamily: 'work sans'}}>{content}</Typography>
          </Box>
        </Box>
      </> 
      : <>
        <Box sx={{display: 'flex', p: 1, gap: 2, alignItems: 'center'}}>
          <Avatar sx={{ml: 0, bgcolor: 'black', color: 'white'}}>
            {auth?.user?.name[0].toUpperCase() + '' + auth?.user?.name[1].toUpperCase()}
          </Avatar>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography sx={{fontSize: '1rem', color: 'black', fontFamily: 'work sans'}}>{content}</Typography>
          </Box>
        </Box>
      </>
}

export default ChatItem