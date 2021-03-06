const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const storageTypes = ({
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            let folder = '';

            if (req.baseUrl.includes('users')) {
                folder = 'users';
            } else if (req.baseUrl.includes('photos')) {
                folder = 'photos';
            }

            cb(null, `uploads/${folder}`)
        },
        filename: (req, file, cb) => {
            cb(null, uuid() + path.extname(file.originalname));
        }
    }),
    // `${pasta}/` + uuid... coloca as photos nas pastas
    s3: multerS3({
        s3: new S3Client({ region: process.env.AWS_DEFAULT_REGION }),
        bucket: 'iservice1',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, uuid() + path.extname(file.originalname));
        },
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        }
    }),
});

const imageUpload = multer({
    storage: storageTypes[process.env.STORAGE_TYPE],
    fileFilter(req, file, cb) {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/jpg'
        ]
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Por favor, envie somente em formato PNG ou JPG.'));
        }
    },
    limits: {
        fileSize: 40 * 1024 * 1024
    }
})

module.exports = { imageUpload }