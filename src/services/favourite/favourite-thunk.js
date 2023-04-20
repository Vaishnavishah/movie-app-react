import { createAsyncThunk } from "@reduxjs/toolkit";
import * as favouriteService from "./favourite-service";


export const createFavouriteThunk = createAsyncThunk(
  'favourite/createFavourite',
  async (favourite) => {
    const newFavourite = await service.createFavourite(favourite)
    return newFavourite
});

export const getFavouriteByUserThunk = createAsyncThunk(
  'favourite/getFavouriteByUser', async () =>
    await service.getFavouriteByUser()
);

export const deleteFavourite = createAsyncThunk(
  'favourite/deleteFavourite',
  async (uid, mid) => {
    await service.deleteFavourite(uid, mid)
    return mid
})

