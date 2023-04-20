import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const FAVOURITES_API = `${SERVER_API_URL}/favourite`;


const api = axios.create({ withCredentials: true });


export const deleteFavourite = async (uid, mid) => {
  const response = await api.delete(`${FAVOURITES_API}/${uid}/${mid}`);
  return response.data
}


export const createFavourite = async (favourite) => {
    const response = await api.post(`${FAVOURITES_API}`, favourite);
    return response.data;
}

export const getFavouriteByUser = async(uid) => {
    const response = await api.get(`${FAVOURITES_API}/${uid}`);
    return response.data;
}