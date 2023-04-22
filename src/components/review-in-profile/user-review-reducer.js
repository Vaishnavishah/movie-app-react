import { createSlice } from "@reduxjs/toolkit";
import {updateReviewThunk, deleteReviewThunk, findReviewByMovieThunk, findReviewByUserThunk, createReviewThunk } from "../../services/review/review-thunk";

const currentUser = {
 "userID": 1,
};

const initialState = {
   reviews: [],
   loading: false
}

const userReviewSlice = createSlice({
 name: 'userReviews',
 initialState: initialState,
 extraReducers: {
      [findReviewByUserThunk.pending]:
         (state) => {
            console.log("here")
            state.loading = true
            state.reviews = []
      },
      [findReviewByUserThunk.fulfilled]:
         (state, { payload }) => {
         console.log("state.review" + state.reviews);
         console.log("payload" + payload);
             state.loading = false
             state.reviews = payload
      },
      [findReviewByUserThunk.rejected]:
         (state, action) => {
            state.loading = false
            state.error = action.error
      },
      [deleteReviewThunk.fulfilled] :
            (state, { payload }) => {
            state.loading = false
            state.reviews = state.reviews
              .filter(t => (t._id !== payload) )
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

export const {createReview} = userReviewSlice.actions
export default userReviewSlice.reducer;