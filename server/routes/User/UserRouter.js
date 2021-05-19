import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import UserController from "./UserController.js";

const controller = new UserController()
const userRouter = Router();



//profile get 
userRouter.get('/getProfiles',authMiddleware,controller.getUserProfiles);

//user get
userRouter.get('/getInfo', authMiddleware, controller.getUserInfo);
userRouter.get('/role',authMiddleware, controller.getUserRole);
userRouter.get('/getAllUsers', controller.getAllUsers);
userRouter.get('/refreshToken',authMiddleware ,controller.refreshToken);

//profile post
userRouter.post('/createProfile',authMiddleware, controller.createProfile);
userRouter.post('/deleteProfile', controller.deleteProfile);
userRouter.post('/updateProfile', controller.updateProfile);

//user post

userRouter.post('/updateUserData', authMiddleware ,controller.updateUserInfo);
userRouter.post('/deleteUser',authMiddleware, controller.deleteUser);
userRouter.post('/updateUser', controller.updateUserDataAdmin);

export default userRouter;