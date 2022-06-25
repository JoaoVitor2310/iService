const Occupation = require('../models/Occupation');
const mongoose = require('mongoose');

//This route will only be used by me.
const insertOccupation = async (req, res) => {
    const { name } = req.body;
    const reqUser = req.user;

    //Checks if the reqUser is the owner;
    if (mongoose.Types.ObjectId(reqUser._id) != process.env.API_OWNER) {
        res.status(403).json({ errors: ['Você não é o dono da API.'] });
        return;
    }
    //Checks if the name of
    if (name === null || name === undefined) {
        res.status(409).json({ errors: ['Você não enviou o nome do serviço.'] });
        return;
    }

    const exist = await Occupation.findOne({ name });

    if (exist) {
        res.status(409).json({ errors: ['Serviço já incluso na API.'] });
        return;
    }

    await Occupation.create({
        name
    })

    res.status(201).json({ message: ['Serviço cadastrado com sucesso!'] });
}

const getAllOccupations = async (req, res) => {
    const occupations = await Occupation.find();
    res.status(200).json(occupations);
}

//I could do a deleteOccupations route, but I have access to the database;

module.exports = {
    insertOccupation,
    getAllOccupations
};