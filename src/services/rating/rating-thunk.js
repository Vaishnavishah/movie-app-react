import { createAsyncThunk } from "@reduxjs/toolkit";
import * as ratingService from "./rating-service";


export const createRatingThunk = createAsyncThunk(
    'rating/createRating',
    async (rating) => {
        const newRating = await ratingService.createRating(rating)
        return newRating;
    });

export const findRatingByUserThunk = createAsyncThunk(
    'rating/findRatingByUser', async (uid) =>
        await ratingService.findRatingByUser(uid)
);

export const findRatingByMovieThunk = createAsyncThunk(
    'rating/findRatingByMovie', async (mid) =>
        await ratingService.findRatingByMovie(mid)
);

export const deleteRatingThunk = createAsyncThunk(
    'rating/deleteRating',
    async (rid) => {
        console.log(rid);
        await ratingService.deleteRating(rid)
        return rid
    });

export const updateRatingThunk = createAsyncThunk(
    'rating/updateRating',
    async (rating) => {
        await ratingService.updateRating(rating);
    });



