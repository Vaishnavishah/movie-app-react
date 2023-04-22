import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";

function Result({ result, openPopup }) {

const [imdbID, setImdbID] =  useState('');
const tmdbapiurl = "https://api.themoviedb.org/3/movie/" + result.id +  "?api_key=0d0e5e0e7c64ee865ffaf322789a7bda&language=en-US`";
    const popular = async () => {
            const {data} = await axios(tmdbapiurl);
            await openPopup(data.imdb_id);
        }

	return (

		<div className="result" onClick={() => popular()}>
		<div class="starContainer">
			<img src={"http://image.tmdb.org/t/p/original" + result.poster_path} />
		</div>
			<h3>{result.title}</h3>
		</div>
	)
}

export default Result
