import User from "../../models/user";
import {hash} from 'bcrypt';

export default class authController{
    async register(req, res){
            try{
                const {email, password} = req.body;
        
                const candidate = await User.findOne({email});
        
                if(candidate){
                    res.status(400).json({message: 'User has registered yet'});
                }
        
                const hashedPassword = await hash(password, 12);
                const user = await User.create({
                    email, 
                    password: hashedPassword,
                });
        
                user.save();
        
                res.json({message: 'User has just added'});
            }catch(e){
                res.status(400).json({message: 'Something went bad!!'})
            }
    }

    async login(req, res){

    }
};