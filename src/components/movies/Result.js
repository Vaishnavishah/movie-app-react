import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {createFavouriteThunk}
  from "../../services/favourite/favourite-thunk";

function Result({ result, openPopup }) {
const dispatch = useDispatch();
const handleHeartClick = () => {
            if(result.imdbID) {
                const newFavourite = {
                    userID: 1,
                    movieID: result.imdbID
                  }
                  dispatch(createFavouriteThunk(newFavourite));
                  console.log("newFavourite");
            }
        }
	return (
		<div className="result" onClick={() => openPopup(result.imdbID)}>
		    <div class="starContainer">
			    <img src={result.Poster} />
			    <span class="star" onClick={() => handleHeartClick()}> <FontAwesomeIcon style ={{padding:"2px;"}} icon={solid('heart')}/> </span>
			</div>
			<h3>{result.Title}</h3>

		</div>
	)
}

export default Result
