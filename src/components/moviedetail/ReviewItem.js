import React from "react";
import {useDispatch, useSelector}
  from "react-redux";
import {useState} from "react";

const ReviewItem = (
 {
   review = {
              "_id": 234,
              "review": "Hello nice movie",
              "movieID": "xyz",
              "userID":1
            }
 }
) => {

 return(
 <>

 <div className="container d-flex mt-2">
        <span className="fw-bold">
                                         {review.review}
                                     </span>
  </div>
</>

 );
 };
 export default ReviewItem;
