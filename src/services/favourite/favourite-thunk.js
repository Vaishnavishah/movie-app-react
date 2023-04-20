import { createAsyncThunk } from "@reduxjs/toolkit";
import * as favouriteService from "./favourite-service";


export const createFavouriteThunk = createAsyncThunk(
  'favourite/createFavourite',
  async (favourite) => {
    const newFavourite = await favouriteService.createFavourite(favourite)
    return newFavourite
});

export const getFavouriteByUserThunk = createAsyncThunk(
  'favourite/getFavouriteByUser', async (uid) =>
    await favouriteService.getFavouriteByUser(uid)
);

export const deleteFavouriteThunk = createAsyncThunk(
  'favourite/deleteFavourite',
  async (uid, mid) => {
    await favouriteService.deleteFavourite(uid, mid)
    return mid
});

