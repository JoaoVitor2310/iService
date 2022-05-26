const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
    occupation: Array,
    rating: Number,
    phone: String,
    WhatsApp: String,
},
{
    timestamps: true
}); 

const User = mongoose.model('User', userSchema);
module.exports = User;