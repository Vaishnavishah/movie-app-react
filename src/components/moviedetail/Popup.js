import React, {useState} from "react";
import {createReview} from "../../reducers/review-reducer";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import ReviewItem from './ReviewItem'


function Popup({ selected, closePopup }) {
let [writeReview, setWriteReview] = useState('');
  const dispatch = useDispatch();
  const review_list = useSelector(state => state.reviews)
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
				<div className="plot">
					<img src={selected.Poster} />
					<p>{selected.Plot}</p>
					<p><b> Reviews </b></p>
					<ul className="list-group">
					{review_list.map((review) => (
                        review.movieID === selected.imdbID
                          ? (<li className = "list-group-item">
                              <ReviewItem
                                key={review._id}
                                review = {review}
                                />
                                </li>)
                          : null
                      ))}

                          </ul>
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

export default Popup
