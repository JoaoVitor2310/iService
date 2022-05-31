const Photo = require('../models/Photo');
const User = require('../models/User');
const mongoose = require('mongoose');

const insertPhoto = async (req, res) => {
    const { title } = req.body;
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

    if (!newPhoto) {
        res.status(422).json({ errors: ['Houve um problema, tente novamente mais tarde.'] });
        return;
    }

    res.status(200).send(newPhoto);
};

const deletePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));
        if (!photo) {
            res.status(404).json({ errors: ['Foto não encontrada.'] });
            return;
        }

        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({ errors: ['Essa foto não é sua.'] })
        }

        await Photo.findByIdAndDelete(photo._id);
        res.status(200).json({ id: photo._id, message: 'Foto excluída com sucesso!' });

    } catch (error) {
        res.status(404).json({ errors: ['Foto não encontradaa.'] });
        return;
    }
}

module.exports = { insertPhoto, deletePhoto }