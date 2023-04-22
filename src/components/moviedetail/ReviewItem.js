import React from "react";
import { useDispatch, useSelector }
  from "react-redux";
import { useState, useEffect } from "react";
import { getUser } from "../../services/auth-service";
import { Link, useParams } from "react-router-dom";
import { deleteReviewThunk } from "../../services/review/review-thunk";

const ReviewItem = (
  {
    review = {
      "_id": 234,
      "review": "Hello nice movie",
      "movieID": "xyz",
      "userID": 1
    },
    deleteReview
  }
) => {
  const [user, setUser] = useState(null);
  const {currentUser} = useSelector(state => state.user)


  const func2 = async (uid) => {
    console.log("uid" + uid);
    const payload = await getUser(uid);
    console.log("payload profile " + payload);
    setUser(payload);
  }

  const getUserById = async () => {
    const response = await getUser(review.userID);
    setUser(response);
  }


  useEffect(() => {
    func2(review.userID);
  }, [])

  
  return (
    <>

      <div className="container d-flex mt-2 justify-content-between align-items-center">
        <div>
          {user?.username ? <Link to={`/profile/${review.userID}`} className="fw-bold">@{user.username}: </Link> : null}
          <span className="fw-bold">
            &nbsp; {review.review}
          </span>
        </div>
        { currentUser && currentUser.isAdmin && <a href="#" onClick={() => deleteReview(review._id)}>X</a> }
      </div>
    </>

  );
};
export default ReviewItem;
