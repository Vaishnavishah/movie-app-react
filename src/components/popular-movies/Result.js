import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {createFavouriteThunk} from "../../services/favourite/favourite-thunk";
import {profileThunk} from "../../services/auth-thunks";
import {
    getFavouriteByUser,
    getFavouriteByUserandMovie
} from "../../services/favourite/favourite-service";

function Result({ result, openPopup }) {

    const [imdbID, setImdbID] =  useState('');
    const [response, setResponse] = useState('');
    const [profile, setProfile] = useState('');
    const tmdbapiurl = "https://api.themoviedb.org/3/movie/" + result.id +  "?api_key=0d0e5e0e7c64ee865ffaf322789a7bda&language=en-US`";

    // useEffect( () => {
    //     async function fetchData() {
    //         const { payload } = await dispatch(profileThunk());
    //         console.log("user payload", payload);
    //         if(payload !== undefined) {
    //             setProfile(payload);
    //             const {data} = await axios(tmdbapiurl);
    //             console.log("movie imdb", data);
    //             await setImdbID(data.imdb_id);
    //             const data1 = await getFavouriteByUserandMovie(payload._id, imdbID);
    //             console.log("get user and movie", data1);
    //             if(data1 !== undefined) {
    //                 setResponse(data1);
    //             }
    //             console.log("ressss", response);
    //         }
    //     }
    //     fetchData();
    // }, [])

    const popular = async () => {
        const {data} = await axios(tmdbapiurl);
        await setImdbID(data.imdb_id);
        console.log(imdbID);
        await openPopup(data.imdb_id);
    }

    const dispatch = useDispatch();

    const handleHeartClick = async (event) => {
        const {data} = await axios(tmdbapiurl);
        console.log("in handle", data);
        await setImdbID(data.imdb_id);
        event.stopPropagation();
        if(imdbID) {
            const { payload } = await dispatch(profileThunk());
            if(payload === undefined) {
                alert("Please log in first!");
            } else {
                const newFavourite = {
                    userID: payload._id,
                    movieID: imdbID
                }
                await dispatch(createFavouriteThunk(newFavourite));
                console.log(newFavourite);
            }
        }
    }

	return (
		<div className="result" onClick={() => {popular();}}>
		<div class="starContainer">
			<img src={"http://image.tmdb.org/t/p/original" + result.poster_path} />
			{/*<span class="star"> {response === '' ? (<FontAwesomeIcon style ={{padding:"2px;"}} icon={solid('heart')} onClick={handleHeartClick} />) : (<FontAwesomeIcon style ={{padding:"2px;",color:"red;"}} icon={solid('heart')} onClick={handleHeartClick} />)} </span>*/}
		</div>
			<h3>{result.title}</h3>
		</div>
	)
}

export default Result;
