import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const RATING_API = `${SERVER_API_URL}/rating`;


const api = axios.create({ withCredentials: true });


export const deleteRating = async (rid) => {
    const response = await api.delete(`${RATING_API}/${rid}`);
    console.log(response);
    return response.data
}


export const createRating = async (rating) => {
    const response = await api.post(`${RATING_API}`, rating);
    console.log("done rat", response);
    return response.data;
}

export const findRatingByMovie = async(mid) => {
    console.log(mid);
    const response = await api.get(`${RATING_API}/movie/${mid}`);
    console.log(response.data);
    return response.data;
}

export const findRatingByUser = async(uid) => {
    const response = await api.get(`${RATING_API}/user/${uid}`);
    return response.data;
}

export const updateRating = async (rating) => {
    const response = await api.put(`${RATING_API}/${rating._id}`, rating);
    return response;
};

export const findRatingByUserandMovie = async (uid, mid) => {
    const response = await api.get(`${RATING_API}/${uid}/${mid}`);
    return response;
}

export const findMovieRating = async (mid) => {
    console.log("midddd", mid);
    const response = await api.get(`http://localhost:4000/api/movierating/${mid}`);
    console.log("avg rating", response)
    return response.data;
}
