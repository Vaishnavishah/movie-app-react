import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import ReviewList from "./Review-list";
import {createReviewThunk} from "../../services/review/review-thunk";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {profileThunk} from "../../services/auth-thunks";
import {deleteFavouriteThunk, createFavouriteThunk} from "../../services/favourite/favourite-thunk";
import {
	getFavouriteByUserandMovie
} from "../../services/favourite/favourite-service";
import {
	createRating,
	findMovieRating,
	findRatingByUserandMovie
} from "../../services/rating/rating-service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Popup({ selected, closePopup }) {
	let [writeReview, setWriteReview] = useState('');
	const dispatch = useDispatch();
	const {currentUser} = useSelector(state => state.user)
	const [response, setResponse] = useState('');
	const [profile, setProfile] = useState('');
	const [flag, setFlag] = useState(false);
	const [rating, setRating] = useState();
	const [avgRating, setAvgRating] = useState(0);
	const [iscritic, setIsCritic] = useState(false);

	useEffect(() => {

		async function func() {
			await dispatch(profileThunk());
			if(currentUser) {
				setIsCritic(currentUser.isCritic);
			}
			await findRatingByUserandMovie(currentUser._id, selected.imdbID).then(data => {
				console.log("rating data", data);
				let response = data;
				setRating(response.data[0].rating);
			})
		}

		func();
	}, [])

	const handleSubmit = () => {
		console.log("currentUser" + currentUser);
		if(currentUser) {
			const newReview = {
				userID: currentUser._id,
				review: writeReview,
				movieID: selected.imdbID
			}
			dispatch(createReviewThunk(newReview));
			console.log(newReview);
			setWriteReview('');
		} else {
			toast.error("Please log in first!", {
				position: toast.POSITION.BOTTOM_CENTER
			});
		}
	}

	useEffect(() => {
		findMovieRating(selected.imdbID).then(data => {
			console.log("count ", data);
			if(data === null) {
				setAvgRating(0);
			} else {
				setAvgRating(data.toFixed(2));
			}
		})
	}, [rating]);

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
			toast.error("Please log in first!", {
				position: toast.POSITION.BOTTOM_CENTER
			});
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

	const handleStarClick = async (id) => {
		if (profile.length <= 0) {
			toast.error("Please log in first!", {
				position: toast.POSITION.BOTTOM_CENTER
			});
		} else {
			const newRating = {
				userID: profile._id,
				movieID: selected.imdbID,
				rating: id
			}
			console.log("new rating", newRating);
			await createRating(newRating);
			setRating(id);
		}
	};


	return (
		<section className="popup">
			<div className="content">
				<h2>{ selected.Title } <span>({ selected.Year })</span> &nbsp;
					{response.length > 0 ? (<span>
					<FontAwesomeIcon style={{padding: "2px;", color:"red"}} icon={solid('heart')}
									 onClick={handleHeartClick}/> </span>) :  (<span>
					<FontAwesomeIcon style={{padding: "2px;"}} icon={solid('heart')}
									 onClick={handleHeartClick}/> </span>)}
				</h2>
				<p className="rating">IMDB Ratings: {selected.imdbRating}</p>
				<p className="rating">Critics Ratings: {avgRating}</p>
				{ iscritic ? (<div className="rating">
					<i> {rating >= 1 ? (<FontAwesomeIcon id="rating_star1" style={{color: "yellow"}}
														 icon={solid('star')}
														 onClick={() => handleStarClick(1)}/>) : (
							 <FontAwesomeIcon id="rating_star1" style={{color: "white"}}
											  icon={solid('star')}
											  onClick={() => handleStarClick(1)}/>)} </i>
					<i> {rating >= 2 ? (<FontAwesomeIcon id="rating_star2" style={{color: "yellow"}}
														 icon={solid('star')}
														 onClick={() => handleStarClick(2)}/>) : (
							 <FontAwesomeIcon id="rating_star2" style={{color: "white"}}
											  icon={solid('star')}
											  onClick={() => handleStarClick(2)}/>)} </i>
					<i> {rating >= 3 ? (<FontAwesomeIcon id="rating_star3" style={{color: "yellow"}}
														 icon={solid('star')}
														 onClick={() => handleStarClick(3)}/>) : (
							 <FontAwesomeIcon id="rating_star3" style={{color: "white"}}
											  icon={solid('star')}
											  onClick={() => handleStarClick(3)}/>)} </i>
					<i> {rating >= 4 ? (<FontAwesomeIcon id="rating_star4" style={{color: "yellow"}}
														 icon={solid('star')}
														 onClick={() => handleStarClick(4)}/>) : (
							 <FontAwesomeIcon id="rating_star4" style={{color: "white"}}
											  icon={solid('star')}
											  onClick={() => handleStarClick(4)}/>)} </i>
					<i> {rating >= 5 ? (<FontAwesomeIcon id="rating_star5" style={{color: "yellow"}}
														 icon={solid('star')}
														 onClick={() => handleStarClick(5)}/>) : (
							 <FontAwesomeIcon id="rating_star5" style={{color: "white"}}
											  icon={solid('star')}
											  onClick={() => handleStarClick(5)}/>)} </i>
				</div>) : null}

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
								   value = {writeReview}
								   onChange={(event) => setWriteReview(event.target.value)}>
                        </textarea>
					</form>
				</div>
				<button className = "submit" onClick = {handleSubmit}> Submit</button>

				<button className="close" onClick={closePopup}>Close</button>
				<br/>
				<br/>
				<ReviewList selected = {selected} />
			</div>
			<ToastContainer/>
		</section>
	)
}

export default Popup