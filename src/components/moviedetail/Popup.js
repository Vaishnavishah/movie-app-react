import React, {useEffect, useState} from "react";
import {createReview} from "../../reducers/review-reducer";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import {profileThunk} from "../../services/auth-thunks";
import {deleteFavouriteThunk, createFavouriteThunk} from "../../services/favourite/favourite-thunk";
import {
	getFavouriteByUserandMovie
} from "../../services/favourite/favourite-service";

function Popup({ selected, closePopup }) {
	let [writeReview, setWriteReview] = useState('');
	const [response, setResponse] = useState('');
	const [profile, setProfile] = useState('');
	console.log("selected", selected);
  	const dispatch = useDispatch();
	 const [flag, setFlag] = useState(false);

	  useEffect(() => {
		  async function fetchData() {
			  const { payload } = await dispatch(profileThunk());
			  console.log("user payload", payload);
			  if(payload !== undefined) {
				  await setProfile(payload);
				  const data = await getFavouriteByUserandMovie(payload._id, selected.imdbID);
				  console.log("get user and movie", data);
				  if(data.length > 0) {
					  setResponse(data);
				  } else {
					  setResponse([]);
				  }
				  console.log("ressss", response);
			  }
		  }
		  fetchData();
	  }, [flag]);

  const handleHeartClick = async () => {
	  if (profile.length <= 0) {
		  alert("Please log in first!");
	  } else {
		  const newFavourite = {
			  userID: profile._id,
			  movieID: selected.imdbID
		  }
		  if(response.length > 0) {
			  await dispatch(deleteFavouriteThunk(newFavourite));
			  await setResponse('');
			  await setFlag(false);
		  } else {
			  const newFavourite = {
				  userID: profile._id,
				  movieID: selected.imdbID
			  }
			  await dispatch(createFavouriteThunk(newFavourite));
			  console.log(newFavourite);
			  await setFlag(true);
		  }
	  }
  }


	const handleSubmit = () => {
		const newReview = {
				review: writeReview,
				movieID: selected.imdbID
			  }
			  dispatch(createReview(newReview));
			  console.log(newReview);

	}

	return (
		<section className="popup">
			<div className="content">
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>
				<p className="rating">Rating: {selected.imdbRating}</p>
				{response.length > 0 ? (<span>
					<FontAwesomeIcon style={{padding: "2px;", color:"red"}} icon={solid('heart')}
									 onClick={handleHeartClick}/> </span>) :  (<span>
					<FontAwesomeIcon style={{padding: "2px;"}} icon={solid('heart')}
									 onClick={handleHeartClick}/> </span>)}

				<div className="plot">
					<img src={selected.Poster} />
					<p>{selected.Plot}</p>
					<p><b> Reviews </b></p>
					<form>
					    <textarea  name="review"
                                   id="write-review"
                                   cols="20"
                                   placeholder="Write a review?"
                                   rows="3"
                                   onChange={(event) => setWriteReview(event.target.value)}>
                        </textarea>
					</form>
				</div>
                <button className = "submit" onClick = {handleSubmit}> Submit</button>

				<button className="close" onClick={closePopup}>Close</button>
			</div>
		</section>
	)
}

export default Popup;
