import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {createFavouriteThunk}
  from "../../services/favourite/favourite-thunk";

function Result({ result, openPopup }) {

const [imdbID, setImdbID] =  useState('');
const tmdbapiurl = "https://api.themoviedb.org/3/movie/" + result.id +  "?api_key=0d0e5e0e7c64ee865ffaf322789a7bda&language=en-US`";
    const popular = () => {
            axios(tmdbapiurl).then(({ data }) => {
                        setImdbID(data.imdb_id)
                    });
              openPopup(imdbID);
        }

          const dispatch = useDispatch();

        const handleHeartClick = () => {
            popular();
            if(imdbID) {
                const newFavourite = {
                        userID: 1,
                        movieID: imdbID
                      }
                      dispatch(createFavouriteThunk(newFavourite));
                      console.log(newFavourite);
            }
        }
	return (

		<div className="result" onClick={() => popular()}>
		<div class="starContainer">
			<img src={"http://image.tmdb.org/t/p/original" + result.poster_path} />
			<span class="star" onClick={() => handleHeartClick()}> <FontAwesomeIcon style ={{padding:"2px;"}} icon={solid('heart')} onClick={() => handleHeartClick()} /> </span>
		</div>
			<h3>{result.title}</h3>
		</div>
	)
}

export default Result
