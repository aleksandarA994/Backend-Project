import { Router } from 'express';
import usersSignUp from '../usersSignUp/index';
import usersProfile from '../usersProfile/index';
import sports from '../sports/index';
import facility from '../facility/index';
import location from '../location/index';
import reservation from '../reservation/index';


const { routes } = usersSignUp;

const indexRouter = Router();

indexRouter.use(routes);
indexRouter.use(usersProfile.routes);
indexRouter.use(sports.routes);
indexRouter.use(facility.routes);
indexRouter.use(location.routes);
indexRouter.use(reservation.routes);


export default indexRouter;