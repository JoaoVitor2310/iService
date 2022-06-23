import {api, requestConfig} from '../utils/config';

//Get user profile data
const profile = async(data, token) => {
    const config = requestConfig('GET', data, token);

    try {
        const res = await fetch(api + '/users/profile', config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const updateProfile = async(data, token) => {
    const config = requestConfig('PUT', data, token, true); //True because its going to upload an image
    
    try {
        const res = await fetch(api + '/users', config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const getUserDetails = async(id) => {
    const config = requestConfig('GET');

    try {
        const res = await fetch(api + '/users/' + id, config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const followUser = async(id, token) => {
    const config = requestConfig('PUT', null, token);

    try {
        const res = fetch(api + '/users/follow/' + id, config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const searchUsers = async(query, token) => {
    const config = requestConfig('GET', null, token);

    try {
        const res = await fetch(api + '/users/search?q=' + query, config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const searchUsersByOccupation = async(query, token) => {
    const config = requestConfig('GET', null, token);

    try {
        const res = await fetch(api + '/users/occupation?q=' + query, config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const userService = {
    profile,
    updateProfile,
    getUserDetails,
    followUser,
    searchUsers,
    searchUsersByOccupation
}

export default userService;