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

const {S3} = require('@aws-sdk/client-s3');
const s3 = new S3({ region: process.env.AWS_DEFAULT_REGION });

photoSchema.pre('remove', function() {
    if(process.env.STORAGE_TYPE === 's3'){
        s3.deleteObject({
            Bucket: 'iservice1',
            Key: this.key
        }, function(){
            if(error){
                console.log(error)
            }
        });
    }else{
    //nada
    }
})

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;