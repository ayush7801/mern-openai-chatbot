import { Router } from 'express';
import userRouter from './userRoutes.js';
import chatsRouter from './chatRoutes.js';

let appRouter = Router();

appRouter.use('/users', userRouter);

appRouter.use('/chats', chatsRouter);


export default appRouter;