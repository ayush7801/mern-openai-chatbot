import { Router } from 'express';
import { getAllUsers, userAuthStatus, userLogin, userSignup } from '../controller/userController.js';
import { logInValidator, signUpValidator, validateRequest } from '../utils/validator.js';
import { verifyToken } from '../utils/token-manager.js';

let userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signup', validateRequest(signUpValidator), userSignup);
userRouter.post('/login', validateRequest(logInValidator), userLogin);
userRouter.get('/auth-status', verifyToken, userAuthStatus);


export default userRouter;