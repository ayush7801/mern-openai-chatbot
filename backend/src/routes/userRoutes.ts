import { Router } from 'express';
import { getAllUsers, userSignup } from '../controller/userController.js';
import { signUpValidator, validateRequest } from '../utils/validator.js';

let userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signup', validateRequest(signUpValidator), userSignup);

export default userRouter;