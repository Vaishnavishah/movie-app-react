import { createSlice } from "@reduxjs/toolkit";
import {deleteFavouriteThunk, createFavouriteThunk, getFavouriteByUserThunk} from "../services/favourite/favourite-thunk";

const currentUser = {
 "userID": 1,
};

const initialState = {
   favouriteArray: [],
   loading: false
}

const favouriteSlice = createSlice({
 name: 'favourite',
 initialState,
 extraReducers: {
     [getFavouriteByUserThunk.pending]:
        (state) => {
           console.log("here")
           state.loading = true
           state.favouriteArray = []
     },
     [getFavouriteByUserThunk.fulfilled]:
        (state, { payload }) => {
            console.log("payload: " + {payload});
           state.loading = false
           state.favouriteArray = payload
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
           state.favouriteArray = state.favouriteArray
             .filter(t => (t.userID !== payload.usedID && t.movieID !== payload.movieID) )
         },
     [createFavouriteThunk.fulfilled]:
           (state, { payload }) => {
             console.log(payload);
             state.loading = false
             state.favouriteArray.push(payload)
         },
   }

     }

);

export default favouriteSlice.reducer;
