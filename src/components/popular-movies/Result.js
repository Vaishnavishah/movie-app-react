import React, {useState} from 'react';
import axios from "axios";

function Result({ result, openPopup }) {

const [imdbID, setImdbID] =  useState('');
const tmdbapiurl = "https://api.themoviedb.org/3/movie/" + result.id +  "?api_key=0d0e5e0e7c64ee865ffaf322789a7bda&language=en-US`";
    const popular = () => {
            axios(tmdbapiurl).then(({ data }) => {
                        setImdbID(data.imdb_id)
                    });
              openPopup(imdbID);
        }
	return (

		<div className="result" onClick={() => popular()}>
			<img src={"http://image.tmdb.org/t/p/original" + result.poster_path} />
			<h3>{result.title}</h3>
		</div>

	)
}

export default Result
