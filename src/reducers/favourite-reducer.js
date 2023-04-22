import { createSlice } from "@reduxjs/toolkit";
import {deleteFavouriteThunk, createFavouriteThunk, findFavouriteByUserThunk} from "../services/favourite/favourite-thunk";

const currentUser = {
 "userID": 1,
};

const initialState = {
   favouriteArray: [],
   loading: false
}

const favouriteSlice = createSlice({
 name: 'favourite',
 initialState: initialState,
    reducers: {
     resetFavourites(state, action) {
         console.log('reset fav')
         // return {
         //     ...state,
         //     favouriteArray: action.payload
         // }
         state.favouriteArray = [];
         console.log("state here", state.favouriteArray);
     }
    },
 extraReducers: {
     [findFavouriteByUserThunk.pending]:
        (state) => {
           state.loading = true
           state.favouriteArray = []
     },
     [findFavouriteByUserThunk.fulfilled]:
        (state, { payload }) => {
            console.log("payload: " + payload);
           state.loading = false
           state.favouriteArray = payload
           console.log("state.favouriteArray", state.favouriteArray)
     },
     [findFavouriteByUserThunk.rejected]:
        (state, action) => {
           state.loading = false
           state.error = action.error
     },
     [deleteFavouriteThunk.fulfilled] :
           (state, { payload }) => {
           state.loading = false
           state.favouriteArray = state.favouriteArray
             .filter(t => (t.userID !== payload.userID && t.movieID !== payload.movieID) )
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

export const {resetFavourites} = favouriteSlice.actions;
export default favouriteSlice.reducer;
