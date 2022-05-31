const Photo = require('../models/Photo');
const User = require('../models/User');
const mongoose = require('mongoose');

const insertPhoto = async(req, res) => {
    const {title} = req.body;
    const image = req.file.filename;
    const reqUser = req.user;
    // console.log(req.file)
    const user = await User.findById(reqUser._id);

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
        size: req.file.size,
        key: req.file.key,
        url: req.file.location
    })

    if(!newPhoto){
        res.status(422).json({errors: ['Houve um problema, tente novamente mais tarde.']});
        return;
    }

    res.status(200).send(newPhoto);
};

module.exports = {insertPhoto}