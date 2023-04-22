import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewService from "./review-service";


export const createReviewThunk = createAsyncThunk(
  'review/createReview',
  async (review) => {
  console.log("Create review thunk");
    const newReview = await reviewService.createReview(review)
    return newReview
});

export const findReviewByUserThunk = createAsyncThunk(
  'review/findReviewByUser', async (uid) =>
    await reviewService.findReviewByUser(uid)
);

export const findReviewByMovieThunk = createAsyncThunk(
  'review/findReviewByMovie', async (mid) =>
    await reviewService.findReviewByMovie(mid)
);

export const deleteReviewThunk = createAsyncThunk(
  'review/deleteReview',
  async (rid) => {
  console.log(rid);
    await reviewService.deleteReview(rid)
    return rid
});

export const updateReviewThunk = createAsyncThunk(
'review/updateReview',
async (review) => {
    await reviewService.updateReview(review);
});



