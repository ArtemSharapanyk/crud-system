import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import UserController from "./UserController.js";
import jwt from 'jsonwebtoken';
import config from 'config';

const secretKey = config.get('jwtSecret');

const controller = new UserController()
const userRouter = Router();

const generateToken = secretData => {
    return jwt.sign(
        secretData,
        secretKey,
        {expiresIn: '31 days'}
    )
};

//profile get 
userRouter.get('/getProfiles',authMiddleware,controller.getUserProfiles);

//user get
userRouter.get('/getInfo', authMiddleware, controller.getUserInfo);
userRouter.get('/role',authMiddleware, controller.getUserRole);
userRouter.get('/getAllUsers', controller.getAllUsers);
userRouter.get('/refreshToken',authMiddleware ,async (req, res) => {
    try{
        const {userId, userRole} = req.user;

        const dataToSecret = {
            userId, userRole
        };

        const newToken = generateToken(dataToSecret);

        res.json({
            token: newToken
        });
    }catch(e){
        console.log(e);
        res.status(400).json({
            message: 'Bad token refresh!'
        })
    }
});

//profile post
userRouter.post('/createProfile',authMiddleware, controller.createProfile);
userRouter.post('/deleteProfile', controller.deleteProfile);
userRouter.post('/updateProfile', controller.updateProfile);

//user post

userRouter.post('/updateUserData', authMiddleware ,controller.updateUserInfo);
userRouter.post('/deleteUser',authMiddleware, controller.deleteUser);
userRouter.post('/updateUser', controller.updateUserDataAdmin);

export default userRouter;