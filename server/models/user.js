import mongoose from 'mongoose';

const user = new mongoose.Schema({
    email:      {type: String, unique: true},
    username:   {type: String, unique: true},
    password:   {type: String}, 
    profiles:   [{type: mongoose.Types.ObjectId, ref: 'Profile'}],
    role:       {type: String, ref: 'Role'},
});


export const User = mongoose.model('User', user);