const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    likes: Array,
    comments: Array,
    userName: String,
},
{
    timestamps: true
})

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;