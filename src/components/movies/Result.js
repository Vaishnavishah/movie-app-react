import React from 'react';

function Result({ result, openPopup }) {

	return (
		<div className="result" onClick={() => openPopup(result.imdbID)}>
		    <div class="starContainer">
			    <img src={result.Poster} />
            </div>
			<h3>{result.Title}</h3>

		</div>
	)
}

export default Result
