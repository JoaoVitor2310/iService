import {api, requestConfig} from '../utils/config';

const getAllOccupations = async(token) => {
    const config = requestConfig('GET', null, token);
    
    try {
        const res = await fetch(api + '/occupations', config).then(res => res.json()).catch(err => err);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const occupationService = {
    getAllOccupations,
}

export default occupationService;