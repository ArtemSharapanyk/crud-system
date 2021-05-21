import {User} from '../../models/User.js';
import {Profile} from '../../models/Profile.js';

export const DashboardController = class DashboardController{
    async pullDashboardData(req, res){
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
    }
};