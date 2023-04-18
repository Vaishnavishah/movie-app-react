import { createSlice } from "@reduxjs/toolkit";

const currentUser = {
 "userID": 1,
};

const favouriteSlice = createSlice({
 name: 'favourite',
 initialState: [],
 reducers: {
        createFavourite(state, action) {
        const movieNdx = state.findIndex((t) => t.movieID === action.payload.movieID);
        if(movieNdx === -1) {
                 state.unshift({
                   ...action.payload,
                   ...currentUser,
                   _id: (new Date()).getTime(),
                 })
               }
           }

         }

     }

);

export const {createFavourite} = favouriteSlice.actions
export default favouriteSlice.reducer;