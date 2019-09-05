import { Router } from 'express';
import actions from './actions';

const { get, list } = actions;
 
const locationRouter = Router();

locationRouter.get('/location', list);
locationRouter.get('/location/:id', get);

export default locationRouter;