import User from "../../models/User.js";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import config from 'config';
import Role from "../../models/Role.js";

const secretKey = config.get('jwtSecret');


const generateToken = secretData => {
    return jwt.sign(
        secretData,
        secretKey,
        {expiresIn: '31 days'}
    )
};

export default class authController{
    async register(req, res){
            try{
                const {email, password, isAdmin, username} = req.body;
        
                const candidate = await User.findOne({username});

        
                if(candidate){
                    res.status(400).json({message: 'User has registered yet'});
                }
        
                const hashedPassword = await bcrypt.hash(password, 12);

                let userRole;
                
                if(isAdmin){
                    userRole = await Role.findOne({value: 'ADMIN'})
                }else{
                    userRole = await Role.findOne({value: 'USER'})
                }

                const user = await User.create({
                    email, 
                    password: hashedPassword,
                    role: userRole.value,
                    username
                });

        
                user.save();
        
                res.json({message: 'User has just added'});
            }catch(e){
                res.status(400).json({message: e})
            }
    }

    async login(req,res){
        try{
            const {username, password} = req.body;
    
            const candidate = await User.findOne({username});
    
            if(!candidate){
                res.status(400).json({message: `User doesn't register`})
            }
        
            const checkPassword = await bcrypt.compare(password, candidate.password);
            
            if(!checkPassword){
                res.status(400).json({message: 'Not true data(email or password)'})
            }
    
            const token = generateToken({
                userId: candidate._id,
                userRole: candidate.role, 
                username
            });
    
            res.json({
                message: 'You have logined',
                token,
            });
    
        }catch(e){
            res.status(400).json({message: 'Bad login!'})
        }
    }
};