import {Router} from 'express'
import User from '../../models/user.js';
import authController from './authController.js';
import {hash} from 'bcrypt';

const auth = Router();
const authCandidat = new authController()

auth.post('/reg',async (req, res) => {
    try{
        const {email, password, name, age} = req.body;

        console.log(email, password, name, age)

        const candidate = await User.findOne({email});

        if(candidate){
            res.status(400).json({message: 'User has registered yet'});
        }

        const hashedPassword = await hash(password, 12);
        const user = await User.create({
            email, 
            password: hashedPassword,
            name,
            age
        });

        user.save();

        res.json({message: 'User has just added'});
    }catch(e){
        res.status(400).json({message: 'Something went bad!!'})
    }
});
auth.post('/log', authCandidat.login);


export default auth;
