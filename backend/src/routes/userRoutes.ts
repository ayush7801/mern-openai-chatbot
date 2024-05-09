import { Router } from 'express';
import { getAllUsers, userAuthStatus, userLogin, userSignup } from '../controller/userController.js';
import { logInValidatorList, signUpValidatorList, validateRequest } from '../utils/validator.js';
import { verifyToken } from '../utils/token-manager.js';

let userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signup', validateRequest(signUpValidatorList), userSignup);
userRouter.post('/login', validateRequest(logInValidatorList), userLogin);
userRouter.get('/auth-status', verifyToken, userAuthStatus);


export default userRouter;