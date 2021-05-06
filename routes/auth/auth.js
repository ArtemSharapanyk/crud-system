import {Router} from 'express'
import User from '../../models/user.js';
import authController from './authController.js';
import {compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';


const auth = Router();
const authCandidat = new authController()

auth.post('/reg', authCandidat.register);
auth.post('/log', async (req,res) => {
    try{
        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if(!candidate){
            res.status(400).json({message: 'The user has already created'})
        }
    
        const checkPassword = await compare(password, candidate.password);

        if(!checkPassword){
            res.status(400).json({message: 'Not true data(email or password)'})
        }

        const token = jwt.sign(
            {userId: candidate.id},
            config.get('jwtSecret'),
            {expiresIn: '31 days'}
        );

        res.json({
            message: 'You have logined',
            userData: {
                token,
                userId: candidate.id
            }
        });

    }catch(e){
        res.status(400).json({message: 'Bad login!'})
    }
});


export default auth;
