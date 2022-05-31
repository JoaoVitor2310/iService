const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
    
    size: Number,
    key: String,
    url: String,
},
{
    timestamps: true
});

const aws = require('aws-sdk');
const s3 = new aws.S3();

photoSchema.pre('remove', function() {
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: 'iservice1',
            Key: this.key
        }).promise();
    }else{
    //nada
    }
})

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;