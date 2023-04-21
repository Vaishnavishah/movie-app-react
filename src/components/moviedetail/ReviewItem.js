import React from "react";
import {useDispatch, useSelector}
  from "react-redux";
import {useState, useEffect} from "react";
import {getUser} from "../../services/auth-service"

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
const [user, setUser] = useState({});
const getUserById = async () => {
        const response = await getUser(review.userID);
        setUser(response);
    }

useEffect(() => {
   getUserById()
 }, [])

 return(
 <>

 <div className="container d-flex mt-2">
        {user[0]?.username ? <span className="fw-bold"> @{user[0].username}: </span> : null}
        <span className="fw-bold">
               &nbsp; {review.review}
        </span>
  </div>
</>

 );
 };
 export default ReviewItem;
