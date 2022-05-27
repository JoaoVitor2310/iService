const multer = require('multer');
const path = require('path');
const {v4: uuid} = require('uuid');

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = '';

        if(req.baseUrl.includes('users')){
            folder = 'users';
        }else if (req.baseUrl.includes('photos')){
            folder = 'photos';
        }

        cb(null, `uploads/${folder}`)
    },
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/jpg'
        ]
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('Por favor, envie somente em formato PNG ou JPG.'))
        }
    }
})

module.exports = { imageUpload }