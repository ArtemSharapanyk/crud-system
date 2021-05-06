import mongoose from 'mongoose';

const User = new mongoose.Schema({
    email:      {type: String, unique: true},
    password:   {type: String}, 
    profiles:   [{type: mongoose.Types.ObjectId, ref: 'Profiles'}]
});


export default mongoose.model('User', User);