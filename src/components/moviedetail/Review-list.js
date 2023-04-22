import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewItem
  from "./ReviewItem";
import { deleteReviewThunk, findReviewByMovieThunk }
  from "../../services/review/review-thunk";

const ReviewList = ({ selected }) => {

  const { reviews, loading } = useSelector(state => state.reviews)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findReviewByMovieThunk(selected.imdbID))
  }, [])

  const deleteReview = (id) => {
    dispatch(deleteReviewThunk(id))
  }

  return (
    <>

      <ul className="list-group">
        {
          loading &&
          <li className="list-group-item">
            Loading...
          </li>
        }

        {
          reviews.map(review =>
          (
            review.movieID === selected.imdbID
              ? (<li className="list-group-item">
                <ReviewItem
                  key={review._id}
                  review={review}
                  deleteReview={deleteReview}
                />
              </li>)
              : null
          )
          )}
      </ul>
    </>
  );

};
export default ReviewList;