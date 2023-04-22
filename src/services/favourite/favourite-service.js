import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const FAVOURITES_API = `${SERVER_API_URL}/favourite`;


const api = axios.create({ withCredentials: true });


export const deleteFavourite = async (uid, mid) => {
    console.log("del res1", uid, mid);
  const response = await api.delete(`${FAVOURITES_API}/${uid}/${mid}`);
  console.log("del res", response);
  return response.data
}


export const createFavourite = async (favourite) => {
    const response = await api.post(`${FAVOURITES_API}`, favourite);
    return response.data;
}

export const findFavouriteByUser = async(uid) => {
    const response = await api.get(`${FAVOURITES_API}/${uid}`);
    console.log("response", response);
    return response.data;
}

export const getFavouriteByUserandMovie = async(uid, mid) => {
    const response = await api.get(`${FAVOURITES_API}/${uid}/${mid}`);
    return response.data;
}