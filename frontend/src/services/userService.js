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

const userService = {
    profile,
    updateProfile
}

export default userService;