import { Router } from 'express';
import { getAllUsers } from '../controller/userController.js';

let userRouter = Router();

userRouter.get('/', getAllUsers);

export default userRouter;