import { createAsyncThunk } from "@reduxjs/toolkit";
import * as favouriteService from "./favourite-service";


export const createFavouriteThunk = createAsyncThunk(
  'favourite/createFavourite',
  async (favourite) => {
    const newFavourite = await favouriteService.createFavourite(favourite)
    return newFavourite
});

export const findFavouriteByUserThunk = createAsyncThunk(
  'favourite/findFavouriteByUser', async (uid) => {
    const res = await favouriteService.findFavouriteByUser(uid)
   return res
});

export const deleteFavouriteThunk = createAsyncThunk(
  'favourite/deleteFavourite', async (favourite) => {
    await favouriteService.deleteFavourite(favourite.userID, favourite.movieID);
    return favourite;
});

