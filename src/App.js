import React, { useState } from 'react';
import axios from 'axios';
import reviewReducer from './reducers/review-reducer';
import userReviewReducer from './components/review-in-profile/user-review-reducer';
import {Routes, Route} from "react-router";
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import Search from './components/movies/Search';
import Results from './components/movies/Results';
import Popup from './components/moviedetail/Popup';
import {BrowserRouter} from "react-router-dom";

import favouriteReducer from "./reducers/favourite-reducer";
import Favourites from "./components/favourites";
import authReducer from "./reducers/auth-reducer";
import ratingReducer from "./reducers/rating-reducer";
import NavigationSidebar from "./components/navigation-sidebar";
import Movies from "./components/movies";
// import Series from "./components/series";
import Profile from "./components/profile";
import Login from "./components/login";
import SignUp from "./components/signup";
import MovieDetail from "./components/moviedetail";
import PopularMovies from "./components/popular-movies";
import EditProfile from './components/profile/edit-profile';

const store = configureStore({
 reducer: {reviews: reviewReducer, user: authReducer, favourite: favouriteReducer, userReviews: userReviewReducer, rating: ratingReducer}});


function App() {

  return (
      <BrowserRouter>
        <Provider store = {store}>
          <div className="container">
            <header>
              <h1>Movie Database</h1>
            </header>
            <main>
              <div className="row mt-6">
                <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                  <NavigationSidebar active="explore"/>
                </div>
                <div className="col-xl-10 col-lg-7 col-10 d-flex flex-column gap-1">
                  <Routes>
                    <Route path="/" element={<PopularMovies/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/profile/:uid" element={<Profile/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/movies/movie" element={<MovieDetail/>}/>
                    <Route path="/favourites" element={<Favourites/>}/>
                    <Route path="/profile/edit" element={<EditProfile />}/>
                  </Routes>
                </div>
              </div>
            </main>
          </div>
          </Provider>
      </BrowserRouter>
  );
}

export default App