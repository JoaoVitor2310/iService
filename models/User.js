const mongoose = require('mongoose');
const {Schema} = require('Schema');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
},
{
    timestamps: true
}); 

const User = mongoose.model(User, userSchema);
module.exports = User;