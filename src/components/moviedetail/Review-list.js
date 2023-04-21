import React, {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import ReviewItem
  from "./ReviewItem";
import {findReviewByMovieThunk}
  from "../../services/review/review-thunk";

const ReviewList = ({selected}) => {

const {reviews, loading} = useSelector(state => state.reviews)
 const dispatch = useDispatch();

 useEffect(() => {
   dispatch(findReviewByMovieThunk(selected.imdbID))
 }, [])

   return(
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
                ? (<li className = "list-group-item">
                    <ReviewItem
                      key={review._id}
                      review = {review}
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