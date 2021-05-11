import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import Profile from "../../models/Profile.js";
import User from "../../models/User.js";
import UserController from "./UserController.js";


const controller = new UserController()
const userRouter = Router();

userRouter.post('/createProfile',authMiddleware, controller.createProfile);
userRouter.get('/getProfiles',authMiddleware,controller.getUserProfiles);
userRouter.post('/deleteProfile', controller.deleteProfile);
userRouter.get('/getInfo', authMiddleware, controller.getUserInfo);
userRouter.get('/role',authMiddleware, controller.getUserRole);
userRouter.post('/updateProfile', async (req, res) => {
    try{
        const {name, typeOfWork, goals, minds, id} = req.body;
        
        const profile = await Profile.findByIdAndUpdate(id, {
            name, typeOfWork, goals, minds
        });

        await profile.save();

        res.json({
            message: 'Profile has been changed'
        });
        
    }catch(e){
        res.status(400).json({message: 'Something went bad'})
    }
});


userRouter.get('/getAllUsers', controller.getAllUsers);

export default userRouter;