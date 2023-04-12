import { createSlice } from "@reduxjs/toolkit";

const currentUser = {
 "userID": 1,
};

const reviewSlice = createSlice({
 name: 'reviews',
 initialState: [],
 reducers: {
        createReview(state, action) {
             state.unshift({
               ...action.payload,
               ...currentUser,
               _id: (new Date()).getTime(),
             })
           }

         }

     }

);

export const {createReview} = reviewSlice.actions
export default reviewSlice.reducer;