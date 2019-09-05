import { Router } from 'express';
import actions from './actions';

const { get, list, listAllResByFacility } = actions;
 
const facilityRouter = Router();

facilityRouter.get('/facility', list);
facilityRouter.get('/facility/:id', get);
facilityRouter.get('/facility/reservations/:id', listAllResByFacility);


export default facilityRouter;