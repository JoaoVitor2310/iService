const mongoose = require('mongoose');
const {Schema} = mongoose;

const occupationSchema = new Schema({
    name: String,
})

const Occupation = mongoose.model('Occupation', occupationSchema);
module.exports = Occupation;