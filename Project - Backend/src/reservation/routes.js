import { Router } from 'express';
import actions from './actions';

const { create, del, list, get, getFullResInfoByIdNum } = actions;
 
const reservationRouter = Router();

reservationRouter.post('/reservation', create);
reservationRouter.get('/reservation', list);
reservationRouter.get('/reservation/:id', get);
reservationRouter.delete('/reservation/:id', del);
reservationRouter.get('/reservationinfo/:id', getFullResInfoByIdNum);



export default reservationRouter;