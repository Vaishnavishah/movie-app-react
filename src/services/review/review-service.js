import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const REVIEW_API = `${SERVER_API_URL}/review`;


const api = axios.create({ withCredentials: true });


export const deleteReview = async (rid) => {
  const response = await api.delete(`${REVIEW_API}/${rid}`);
  console.log(response);
  return response.data
}


export const createReview = async (review) => {
    const response = await api.post(`${REVIEW_API}`, review);
    return response.data;
}

export const findReviewByMovie = async(mid) => {
console.log(mid);
    const response = await api.get(`${REVIEW_API}/movie/${mid}`);
    console.log(response.data);
    return response.data;
}

export const findReviewByUser = async(uid) => {
    const response = await api.get(`${REVIEW_API}/user/${uid}`);
    return response.data;
}

export const updateReview = async (review) => {
    const response = await api.put(`${REVIEW_API}/${review._id}`, review);
    return response;
};
