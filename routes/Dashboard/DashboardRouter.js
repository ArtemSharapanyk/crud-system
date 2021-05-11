import {Router} from 'express';
import Profile from '../../models/Profile.js';
import User from '../../models/User.js';
import { DashboardController } from './DashboardController.js';

const dashboardRouter = Router();

dashboardRouter.get('/info', async (req, res) => {
    try{
        const profiles = await Profile.find();
        const users = await User.find();
        const profilesUpperEighteen = profiles.filter((item) => +item.age > 18);


        res.json({
            usersCount: users.length < 10 ? `0${users.length}` : users.length,
            profilesCount:profiles.length < 10 ? `0${profiles.length}` : profiles.length,
            profilesUpperEighteen: profilesUpperEighteen.length > 0 && profilesUpperEighteen.length < 9 ? `0${profilesUpperEighteen.length}` : profilesUpperEighteen.length
        });
    }catch(e){
        res.status(400).json({
            message: 'Something went bad'
        });
    }
});

export default dashboardRouter;
