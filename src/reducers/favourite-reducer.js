import { createSlice } from "@reduxjs/toolkit";
import {deleteFavouriteThunk, createFavouriteThunk, getFavouriteByUserThunk} from "../services/favourite/favourite-thunk";

const currentUser = {
 "userID": 1,
};

const initialState = {
   favourites: [],
   loading: false
}

const favouriteSlice = createSlice({
 name: 'favourite',
 initialState,
 extraReducers: {
     [getFavouriteByUserThunk.pending]:
        (state) => {
           state.loading = true
           state.favourites = []
     },
     [getFavouriteByUserThunk.fulfilled]:
        (state, { payload }) => {
            console.log("payload: " + {payload});
           state.loading = false
           state.favourites = payload
           console.log(state.favourites)
     },
     [getFavouriteByUserThunk.rejected]:
        (state, action) => {
           state.loading = false
           state.error = action.error
     },
     [deleteFavouriteThunk.fulfilled] :
           (state, { payload }) => {
           state.loading = false
           state.favourites = state.favourites
             .filter(t => (t.userID !== payload.usedID && t.movieID !== payload.movieID) )
         },
     [createFavouriteThunk.fulfilled]:
           (state, { payload }) => {
             console.log(payload);
             state.loading = false
             state.favourites.push(payload)
         },
   }

     }

);

export default favouriteSlice.reducer;
