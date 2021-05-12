import { hash } from "bcrypt";
import Profile from "../../models/Profile.js";
import User from "../../models/User.js";

export  class UserController{
    async createProfile(req,res){
        try{
            const {name, typeOfWork, goals, minds, age} = req.body;
    
            const ownerOfProfile = req.user.userId;
            
            const profile = await Profile.create({
                name, typeOfWork,goals, minds, owner: ownerOfProfile, age: +age
            });
    
            await profile.save();
    
            res.json({message: 'Profile has successful added'})
        }catch(e){
            res.status(400).json('Something go bad');
        }
    }

    async getUserProfiles(req,res){
        try{
            const profiles = await Profile.find({owner: req.user.userId});
    
            if(!profiles.length){
                return res.json({
                    profiles: []
                });
            }
    
            const newProfileArray = profiles.map(({name, typeOfWork, goals, minds, id, age}) => {
                return {
                    name, typeOfWork, goals, minds, id, age
                }
            });
    
            res.json({
                profiles: newProfileArray
            })
        }catch(e){
            res.status(400).json({message: 'Something went bad'});
        }
    }
    

    async deleteProfile(req,res){
        try{
            const {id} = req.body;
            const profiles = await Profile.findByIdAndDelete(id);
    
            profiles.save();
    
            res.json({
                message : 'Users have been deleted'
            });
    
        }catch(e){
            res.status(400).json({message: e})
        }
    }

    async updateProfile(req, res){
        try{
            const {name, typeOfWork, goals, minds, id ,age} = req.body;
    
            
            const profile = await Profile.findByIdAndUpdate(id, {
                name, typeOfWork, goals, minds, age: +age
            });
    
            await profile.save();
    
            res.json({
                message: 'Profile has been changed'
            });
            
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Something went bad'})
        }
    }

    async getUserInfo(req,res){
        try{
            const user = await User.findById(req.user.userId);
    
            if(!user){
                return res.status(400),json({
                    message: 'User not find'
                })
            }
    
    
            res.json({
                email: user.email,
                username: user.username,
                id: req.user.id
            });
        }catch(e){
            res.status(400).json({
                message: e.message
            })
        }
    }
    
    async getUserRole(req, res){
        try{
            res.json({
                role: req.user.userRole
            });
        }catch(e){
            res.status(400).json('Something bad');
        }
    }

    async getAllUsers(req, res){
        try{
            const users = await User.find();
    
            if(users.length === 0){
                return res.json({
                    users
                })
            }
    
            const newUsersArray = users.map(({role, username, email,id}) => ({
                role, username, email, id
            }));
    
            
            res.json({
                users: newUsersArray
            });
        }catch(e){
            res.status(400).json({
                message: 'Bad user getting'
            })
        }
    }

    async updateUserInfo(req,res){
        try{
            const {username, email, password} = req.body;
    
            const hashedPassword = await hash(password, 12);
        
            const user = await User.findByIdAndUpdate(req.user.userId, {
                username, email,password: hashedPassword
            });
    
    
    
            await user.save();
    
            res.json({
                message: 'User successfully changed'
            });
        }catch(e){
            console.log(e);
            res.status(400).json({
                message: 'Update was failded'
            });
        }
    }

    async deleteUser(req, res){
        try{
            const {id} = req.body;
    
    
            const user = await User.findByIdAndDelete(id);
    
            user.save();
    
            res.json({
                message: 'User has deleted'
            });
        }catch(e){
            res.status(400).json({
                message: `User hasn't deleted`
            });
        }
    }
}

export default UserController;