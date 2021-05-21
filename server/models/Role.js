import mongoose from 'mongoose';

const role = new mongoose.Schema({
    value: {type: String, required: true,unique: true,default: 'USER'}
});


export const Role = mongoose.model('Role', role);