const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require('mongoose');

const { S3 } = require('@aws-sdk/client-s3');
const s3 = new S3({ region: process.env.AWS_DEFAULT_REGION });

//Generate user token
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: '7d',
    })
};

// Register and sign in
const register = async(req, res) => {
    const {name, occupation, email, password} = req.body;
    console.log(req.body);

    //Check if user exists
    const user = await User.findOne({email});
    if(user){
        res.status(409).json({errors: ['Email já cadastrado, utilize outro.']});
        return;
    }
    //Create password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //Create user
    const newUser = await User.create({
        name,
        occupation,
        email,
        password: passwordHash
    })

    if (!newUser) {
        res.status(422).json({ errors: ['Houve um erro, tente novamente mais tarde.'] });
        return;
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

//Sign user in
const login = async(req, res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
    if(!user){
        res.status(404).json({errors: ['Usuário não encontrado.']});
        return;
    }

    if(!(await bcrypt.compare(password, user.password))){
        res.status(401).json({errors: ['Senha incorreta.']});
        return;
    }

    res.status(200).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    })
};

const getCurrentUser = async(req, res) => {
    const user = req.user;
    
    res.status(200).json(user);
}

const update  = async(req, res) => {
    const { name, password, bio } = req.body;
    let profileImage = null;
    const reqUser = req.user;

    if (req.file) {
        profileImage = req.file.location;
        if(reqUser.profileImage){
            const previousKey = reqUser.profileImage.split('.com/')[1];
            await s3.deleteObject({ //Deletes the previous profile image on amazon s3
                Bucket: 'iservice1',
                Key: previousKey
            });
        }
    }

    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select('-password');

    if (name) {
        user.name = name;
    }

    if (password) {

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash;
    }

    if (profileImage) {
        user.profileImage = profileImage;
    }

    if (bio) {
        user.bio = bio;
    }

    await user.save();
    res.status(200).json(user);
}

const getUserById = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(mongoose.Types.ObjectId(id)).select('-password');        
        if(!user){
            res.status(404).json({errors: ['Usuário não encontrado.']});
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({errors: ['Id inválido']});
        return
    }

}

const searchUsers = async(req, res) => {
    const {q} = req.query;
    const users = await User.find({name: new RegExp(q, 'i')}).exec();
    
    res.status(200).json(users);
}

const followUser = async (req, res) => {
    const { id } = req.params; // User to follow
    const reqUser = req.user; // Actual user
    
    try {
        const user = await User.findById(id)
        const userFollowing = await User.findById(reqUser._id);

        if(user.followers.includes(reqUser._id)){
            await User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, {$pull: {followers: reqUser._id} }, { upsert: true });
            await User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(reqUser._id) }, {$pull: {following: id} }, { upsert: true });

            res.status(200).json({user, userFollowing, message: ['Deixou de seguir.']});
            return;
        }

        await User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, {$push: {followers: reqUser._id} }, { upsert: true });
        await User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(reqUser._id) }, {$push: {following: id} }, { upsert: true });
        res.status(200).json({user, userFollowing, message: ['Seguindo!']});
        
    } catch (error) {  
        console.log(error);
        res.status(404).json({ errors: ['Usuário não encontrado.'] });
    }
    return;
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
    searchUsers,
    followUser,
}