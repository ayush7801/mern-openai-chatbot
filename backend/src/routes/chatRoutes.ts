import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { clearChat, generateChatCompletion, getChatHistory, getSingleResponse } from '../controller/chatController.js';
import { chatReqValidatorList, validateRequest } from '../utils/validator.js';

let chatsRouter = Router();

chatsRouter.post('/generateChatCompletion', validateRequest(chatReqValidatorList), verifyToken, generateChatCompletion);

chatsRouter.post('/getChatHistory', verifyToken, getChatHistory);

chatsRouter.post('/clearChat', verifyToken, clearChat);

chatsRouter.post('/getSingleResponse', getSingleResponse);

export default chatsRouter;