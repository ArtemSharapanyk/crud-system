import { hash } from "bcrypt";
import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import User from "../../models/User.js";
import UserController from "./UserController.js";

const controller = new UserController()
const userRouter = Router();

userRouter.get('/getProfiles',authMiddleware,controller.getUserProfiles);
userRouter.get('/getInfo', authMiddleware, controller.getUserInfo);
userRouter.get('/role',authMiddleware, controller.getUserRole);
userRouter.get('/getAllUsers', controller.getAllUsers);

userRouter.post('/createProfile',authMiddleware, controller.createProfile);
userRouter.post('/deleteProfile', controller.deleteProfile);
userRouter.post('/updateProfile', controller.updateProfile);
userRouter.post('/updateUserData', authMiddleware ,controller.updateUserInfo);
userRouter.post('/deleteUser', controller.deleteUser);
userRouter.post('/updateUser', async (req, res) => {
    try{
        const {id, data} = req.body;

        const hashedPassword = await hash(data.password, 12);

        const updatedObject = {
            ...data, 
            password: hashedPassword
        };

        console.log(id, data)

        const user = await User.findByIdAndUpdate(id, updatedObject);

        await user.save();

        res.json({
            message: 'User has updated'
        });
    }catch(e){
        console.log(e)

        res.status(400).json({
            message: `User hasn't updated`
        });
    }
});

export default userRouter;