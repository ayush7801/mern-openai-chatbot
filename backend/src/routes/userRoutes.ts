import { Router } from 'express';
import { getAllUsers, userLogin, userSignup } from '../controller/userController.js';
import { logInValidator, signUpValidator, validateRequest } from '../utils/validator.js';

let userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signup', validateRequest(signUpValidator), userSignup);
userRouter.post('/login', validateRequest(logInValidator), userLogin);


export default userRouter;