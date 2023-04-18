import React, {useState} from 'react';
import {createFavourite} from "../../reducers/favourite-reducer";
import {useDispatch} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

function Result({ result, openPopup }) {
const dispatch = useDispatch();
const handleHeartClick = () => {
            if(result.imdbID) {
                const newFavourite = {
                        movieID: result.imdbID
                      }
                      dispatch(createFavourite(newFavourite));
                      console.log(newFavourite);
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
