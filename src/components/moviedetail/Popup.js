import React, {useState} from "react";
import {createReview} from "../../reducers/review-reducer";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import ReviewList from "./Review-list";
import {createReviewThunk} from "../../services/review/review-thunk";


function Popup({ selected, closePopup }) {
let [writeReview, setWriteReview] = useState('');
  const dispatch = useDispatch();
  const review_list = useSelector(state => state.reviews)
const handleSubmit = () => {
    const newReview = {
            userID: 2,
            review: writeReview,
            movieID: selected.imdbID
          }
          dispatch(createReviewThunk(newReview));
          console.log(newReview);

}


	return (
		<section className="popup">
			<div className="content">
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>
				<p className="rating">Rating: {selected.imdbRating}</p>
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
				<ReviewList selected = {selected} />
			</div>
		</section>
	)
}

export default Popup