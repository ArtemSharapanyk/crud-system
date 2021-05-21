import mongoose from 'mongoose';

const profile =  mongoose.Schema({
    name: {type: String, required: true},
    typeOfWork: {type: String, required: true},
    goals: {type: String, required: true},
    minds: {type: String, required: true},
    owner: {type: String, required: true},
    age: {type: String, required: true}
});

export const Profile = mongoose.model('Profile', profile)