import {Router} from 'express';
import { DashboardController } from './DashboardController.js';

const dashboardRouter = Router();
const controller  = new DashboardController()

dashboardRouter.get('/info', controller.pullDashboardData);

export default dashboardRouter;
