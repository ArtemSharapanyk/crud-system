import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name:       {type: String},
    age:        {type: String},
    password:   {type: String}, 
    email:      {type: String, unique: true},
    posts: [{type: mongoose.Types.ObjectId, ref: 'Post'}]
});


export default mongoose.model('User', User);