import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {createFavouriteThunk}
  from "../../services/favourite/favourite-thunk";
import {profileThunk} from "../../services/auth-thunks";

function Result({ result, openPopup }) {
const dispatch = useDispatch();
const handleHeartClick = async () => {
            if(result.imdbID) {
                const { payload } = await dispatch(profileThunk());
                console.log("payload id", payload);
                const newFavourite = {
                    userID: payload._id,
                    movieID: result.imdbID
                }
                await dispatch(createFavouriteThunk(newFavourite));
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
