import { createSlice } from "@reduxjs/toolkit";
import {updateRatingThunk, deleteRatingThunk, findRatingByMovieThunk, findRatingByUserThunk, createRatingThunk } from "../services/rating/rating-thunk";

const currentUser = {
    "userID": 1,
};

const initialState = {
    rating: [],
    loading: false
}

const ratingSlice = createSlice({
                                    name: 'rating',
                                    initialState: initialState,
                                    extraReducers: {
                                        [findRatingByMovieThunk.pending]:
                                            (state) => {
                                                console.log("here")
                                                state.loading = true
                                                state.rating = []
                                            },
                                        [findRatingByMovieThunk.fulfilled]:
                                            (state, { payload }) => {
                                                console.log("state.review" + state.reviews);
                                                console.log("payload" + payload);
                                                state.loading = false
                                                state.rating = payload
                                            },
                                        [findRatingByMovieThunk.rejected]:
                                            (state, action) => {
                                                state.loading = false
                                                state.error = action.error
                                            },
                                        [deleteRatingThunk.fulfilled] :
                                            (state, { payload }) => {
                                                state.loading = false
                                                state.rating = state.rating
                                                    .filter(t => (t._id != payload) )
                                            },
                                        [createRatingThunk.fulfilled]:
                                            (state, { payload }) => {
                                                console.log(payload);
                                                state.loading = false
                                                state.rating.push(payload)
                                            },
                                    },
                                    reducers: {
                                        createRating(state, action) {
                                            state.rating.unshift({
                                                                      ...action.payload,
                                                                      ...currentUser,
                                                                      _id: (new Date()).getTime(),
                                                                  })
                                        }

                                    }

                                }

);

export const {createRating} = ratingSlice.actions
export default ratingSlice.reducer;