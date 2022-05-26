const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require('mongoose');

//Generate user token
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: '7d',
    })
};

// Register and sign in
const register = async(req, res) => {
    const {name, email, password} = req.body;

    //Check if user exists
    const user = await User.findOne({email});
    if(user){
        res.status(409).json({errors: ['Email já cadastrado, utilize outro.']});
        return
    }
    //Create password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //Create user
    const newUser = await User.create({
        name,
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

module.exports = {
    register,
    login
}