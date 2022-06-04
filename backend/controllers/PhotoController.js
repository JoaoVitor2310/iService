const Photo = require('../models/Photo');
const User = require('../models/User');
const mongoose = require('mongoose');

const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;
    const reqUser = req.user;

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

        const { S3 } = require('@aws-sdk/client-s3');
        const s3 = new S3({ region: process.env.AWS_DEFAULT_REGION });

        Photo.deleteOne(async function () {
            if (process.env.STORAGE_TYPE === 's3') {
                await s3.deleteObject({
                    Bucket: 'iservice1',
                    Key: photo.key
                });
            } else {
                console.log('Não está no modo s3');
            }
        })


        res.status(200).json({ id: photo._id, message: 'Foto excluída com sucesso!' });

    } catch (error) {
        res.status(404).json({ errors: ['Foto não encontradaa.'] });
        return;
    }
}

const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort([['createdAt', -1]]).exec();
    return res.status(200).json(photos);
}

const getUserPhotos = async (req, res) => {
    const { id } = req.params;
    const photos = await Photo.find({ userId: id }).sort([['createdAt', -1]]).exec();
    if (!photos) {
        res.status(404).json({ errors: ['O usuário não postou fotos.'] })
    }
    return res.status(200).json(photos);
}

const getPhotoById = async (req, res) => {
    const { id } = req.params;
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    if (!photo) {
        res.status(404).json({ errors: ['Foto não encontrada.'] })
        return;
    }
    res.status(200).json(photo);

}

module.exports = { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById }