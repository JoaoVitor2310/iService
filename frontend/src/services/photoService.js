import {api, requestConfig} from '../utils/config';

//Publishes user photo
const publishPhoto = async(data, token) => {
    const config = requestConfig('POST', data, token, true); //True because will post a photo

    try {
        const res = await fetch(api + '/photos', config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

//Get all photos of an user
const getUserPhotos = async(id, token) => {
    const config = requestConfig('GET', null, token);
    try {
        const res = await fetch(`${api}/photos/user/${id}`, config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);    
    }
};

//Deletes a photo
const deletePhoto = async(id, token) => {
    const config = requestConfig('DELETE', null, token);

    try{
        const res = await fetch(`${api}/photos/${id}`, config).then(res => res.json()).catch(err => err);
        return res;
    }catch(error){
        console.log(error);
    }
}

//Updates a photo(post)
const updatePhoto = async(data, id, token) => {
    const config = requestConfig('PUT', data, token);
    
    try {
        const res = await fetch(api + '/photos/' + id, config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

//Gets a specific photo(post)
const getPhoto = async(id, token) => {
    const config = requestConfig('GET', null, token);
    
    try{
        const res = await fetch(api + '/photos/' + id, config).then(res => res.json()).catch(err => err);
        return res;

    }catch(error){
        console.log(error);
    }
}

//Gets all photos(post)
const getPhotos = async(token) => {
    const config = requestConfig('GET', null, token);
    
    try {
        const res = await fetch(api + '/photos', config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

//Likes photo(post)
const like = async(id, token) => {
    const config = requestConfig('PUT', null, token);

    try {
        const res = await fetch(api + '/photos/like/' + id, config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

//Comments photo(post)
const comment = async(data, id, token) => {
    const config = requestConfig('PUT', data, token);

    try {
        const res = await fetch(api + '/photos/comment/' + id, config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos,
}

export default photoService;