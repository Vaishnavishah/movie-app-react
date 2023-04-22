import React from "react";
import {useDispatch, useSelector}
  from "react-redux";
import {useState, useEffect} from "react";
import {getUser} from "../../services/auth-service";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Result from "../movies/Result";
import {updateReviewThunk, deleteReviewThunk} from "../../services/review/review-thunk";

function ReviewItem(
 {
   review = {
              "_id": 234,
              "review": "Hello nice movie",
              "movieID": "xyz",
              "userID":1
            }
 }
) {
const [movie, setMovie] = useState('');
let [writeReview, setWriteReview] = useState(review.review);
const omdbapiurl = "http://www.omdbapi.com/?apikey=dfe6d885";
const dispatch = useDispatch();

const searchMovie = (id) => {
            axios(omdbapiurl + "&i=" + id).then(({ data }) => {
                let result = data;
                setMovie(result);
            });
        }

const handleUpdateClick = () => {

    const newReview = {
            _id : review._id,
            userID: review.userID,
            review: writeReview,
            movieID: review.movieID
          }

          dispatch(updateReviewThunk(newReview));
          console.log(newReview);
}

const handleDeleteClick = () => {
    dispatch(deleteReviewThunk(review._id));
}


useEffect(() => {
    searchMovie(review.movieID);
}, []);

 return(
 <>

 <div className="container mt-2">
        <img src={movie.Poster} style = {{width: "70px", height: "100px"}}/>
        <span className="fw-bold">
               {movie.Title}
        </span>
        <span>
            <form>
            	<textarea  name="review"
                       id="write-review"
                       cols="20"
                       placeholder="Write a review?"
                       value = {writeReview}
                       rows="2"
                       onChange={(event) => setWriteReview(event.target.value)}>
                </textarea>
            </form>
        </span>
        <button className = "btn btn-secondary" onClick = {handleUpdateClick} > Update</button>
        <button className="btn btn-danger" onClick = {handleDeleteClick} >Delete</button>
  </div>
</>

 );
 }
 export default ReviewItem;
