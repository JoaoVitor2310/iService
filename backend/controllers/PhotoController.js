const PHoto = require('../models/Photo');
const mongoose = require('mongoose');

const insertPhoto = async(req, res) => {
    const {title} = req.body;
    const image = req.file.filename;
    console.log(req.body);
    res.status(200).send('Photo insert')
};

module.exports = {insertPhoto}