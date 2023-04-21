import { createSlice } from "@reduxjs/toolkit";
import {updateReviewThunk, deleteReviewThunk, findReviewByMovieThunk, findReviewByUserThunk, createReviewThunk } from "../services/review/review-thunk";

const currentUser = {
 "userID": 1,
};

const initialState = {
   reviews: [],
   loading: false
}

const reviewSlice = createSlice({
 name: 'reviews',
 initialState: initialState,
 extraReducers: {
      [findReviewByMovieThunk.pending]:
         (state) => {
            console.log("here")
            state.loading = true
            state.reviews = []
      },
      [findReviewByMovieThunk.fulfilled]:
         (state, { payload }) => {
         console.log("state.review" + state.reviews);
         console.log("payload" + payload);
             state.loading = false
             state.reviews = payload
      },
      [findReviewByMovieThunk.rejected]:
         (state, action) => {
            state.loading = false
            state.error = action.error
      },
      [deleteReviewThunk.fulfilled] :
            (state, { payload }) => {
            state.loading = false
            state.reviews = state.reviews
              .filter(t => (t.userID !== payload.usedID && t.movieID !== payload.movieID) )
          },
      [createReviewThunk.fulfilled]:
            (state, { payload }) => {
              console.log(payload);
              state.loading = false
              state.reviews.push(payload)
        },
    },
 reducers: {
        createReview(state, action) {
             state.reviews.unshift({
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