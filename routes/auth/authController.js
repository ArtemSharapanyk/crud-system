import User from "../../models/user.js";
import bcrypt from 'bcrypt';

export default class authController{
    async register(req, res){
            try{
                const {email, password} = req.body;
        
                const candidate = await User.findOne({email});

        
                if(candidate){
                    res.status(400).json({message: 'User has registered yet'});
                }
        
                const hashedPassword = await bcrypt.hash(password, 12);
                console.log(hashedPassword)
                const user = await User.create({
                    email, 
                    password: hashedPassword,
                });

        
                user.save();
        
                res.json({message: 'User has just added'});
            }catch(e){
                res.status(400).json({message: e})
            }
    }

    async login(req, res){

    }
};