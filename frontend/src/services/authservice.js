import { api, requestConfig } from '../utils/config';

//Register user
const register = async (data) => {
    const config = requestConfig('POST', data); // Configures the fetch function and sends the data
    try {
        const res = await fetch(api + '/users/register', config).then(res => res.json()).catch(err => err); //Makes the request to the endpoint with the above configuration
        if (res) {
            localStorage.setItem('user', JSON.stringify(res)); //Receives the user(id and token), stringifies and storages 
        }
        return res; // Returns the response
    } catch (error) {
        console.log(error);
    }

}

//Logout user
const logout = async() => {
    localStorage.removeItem('user'); //Just removes him from localStorage
}

//Login user
const login = async (data) => {
    const config = requestConfig('POST', data);
    
    try {
        const res = await fetch(api + '/users/login', config).then(res => res.json()).catch(err => err);//Makes the request

        if(res._id){ //Receives the user(id and token) and storages
            localStorage.setItem('user', JSON.stringify(res));
        }
        return res;
    } catch (error) {
        console.log(error);
    }
}

const authService = {
    register,
    logout,
    login
}

export default authService;