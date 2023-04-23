import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import ReviewItem from "./review-item";
import {findReviewByUserThunk} from "../../services/review/review-thunk";
import axios from "axios";

const ReviewList = ({profile, isCurrUser}) => {
console.log("profile in revie in profile" , profile);
const {reviews, loading} = useSelector(state => state.userReviews)
const dispatch = useDispatch();
const [movie, setMovie] = useState([]);

 useEffect(() => {
   dispatch(findReviewByUserThunk(profile._id));
 }, [profile])

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
              review.userID === profile._id
                ? (
                <li className = "list-group-item">
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