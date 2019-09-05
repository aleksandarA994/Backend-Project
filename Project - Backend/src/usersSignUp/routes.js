import { Router } from 'express';
import actions from './actions';

const { create, del, list, get, login, update } = actions;
 
const userRouter = Router();

userRouter.post('/sign-up', create);
userRouter.get('/usersSignUp', list);
userRouter.get('/usersSignUp/:id', get);
userRouter.delete('/usersSignUp/:id', del);
userRouter.post('/login', login);

export default userRouter;