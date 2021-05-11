import Profile from "../../models/Profile.js";
import User from "../../models/User.js";

export  class UserController{
    async createProfile(req,res){
        try{
            const {name, typeOfWork, goals, minds} = req.body;
    
            const ownerOfProfile = req.user.username;
            
            const profile = await Profile.create({
                name, typeOfWork,goals, minds, owner: ownerOfProfile
            });
    
            await profile.save();
    
            res.json({message: 'Profile has successful added'})
        }catch(e){
            res.status(400).json('Something go bad');
        }
    }

    async getUserProfiles(req,res){
        try{
            const profiles = await Profile.find({owner: req.user.username});
    
            if(!profiles.length){
                return res.json({
                    profiles: []
                });
            }
    
            const newProfileArray = profiles.map(({name, typeOfWork, goals, minds, id}) => {
                return {
                    name, typeOfWork, goals, minds, id
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

    async getUserInfo(req,res){
        try{
            const user = await User.findOne({username: req.user.username });
    
            if(!user){
                return res.status(400),json({
                    message: 'User not find'
                })
            }
    
    
            res.json({
                email: user.email,
                username: user.username,
            })
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
    
            const newUsersArray = users.map(({role, username, email}) => ({
                role, username, email
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
}

export default UserController;