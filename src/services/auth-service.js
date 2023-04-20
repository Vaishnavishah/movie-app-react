import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;


const api = axios.create({ withCredentials: true });


export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/login`, {
        username,
        password,
    });
    const user = response.data;
    return user;
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};


export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);
    return response.data;
};


export const updateUser = async (user) => {
    const response = await api.post(`${USERS_URL}/update`, user);
    return response.data;
};


export const register = async (user) => {
    const response = await api.post(`${USERS_URL}/register`, user);
    return response.data;
}

export const getUser = async(uid) => {
    const response = await api.get(`${USERS_URL}/${uid}`);
    return response.data;
}