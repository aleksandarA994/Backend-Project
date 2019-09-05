import { Router } from 'express';
import actions from './actions';

const { get, list, listFullInfoForFootball, listFullInfoForBasketball, listFullInfoForTennis } = actions;
 
const sportsRouter = Router();

sportsRouter.get('/sports', list);
sportsRouter.get('/sports/:id', get);
sportsRouter.get('/sportsinfo/football', listFullInfoForFootball);
sportsRouter.get('/sportsinfo/basketball', listFullInfoForBasketball);
sportsRouter.get('/sportsinfo/tennis', listFullInfoForTennis);

export default sportsRouter;