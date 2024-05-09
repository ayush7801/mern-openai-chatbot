import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { generateChatCompletion } from '../controller/chatController.js';
import { chatReqValidatorList, validateRequest } from '../utils/validator.js';

let chatsRouter = Router();

chatsRouter.post('/generateChatCompletion', validateRequest(chatReqValidatorList),verifyToken, generateChatCompletion);

export default chatsRouter;