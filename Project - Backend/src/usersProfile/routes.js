import { Router } from 'express';
import actions from './actions';

const { create, del, list, get, update, listAllResByUser } = actions;
 
const userProfileRouter = Router();

userProfileRouter.post('/usersSignUp/:userId/usersProfile', create);
userProfileRouter.get('/usersProfile', list);
userProfileRouter.get('/usersProfile/:id', get);
userProfileRouter.delete('/usersProfile/:id', del);
userProfileRouter.put('/usersProfile/:id', update);
userProfileRouter.get('/usersProfile/reservations/:id', listAllResByUser);


export default userProfileRouter;