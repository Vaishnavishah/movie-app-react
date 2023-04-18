import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import Results from "../movies/Results";
import Popup from "../moviedetail/Popup";

function Favourite() {
const favouriteArray = useSelector(state => state.favourites);

const [favouriteState, setFavouriteState] = useState([]);
const [state, setState] = useState({s: " ",
                                    results: [],
                                    selected: {}});

const omdbapiurl = "http://www.omdbapi.com/?apikey=dfe6d885";

const favouriteMovies = async () => {
    const promises = favouriteArray.map(favourite => axios(omdbapiurl + "&i=" + favourite.movieID))
         const data = await Promise.all(promises);
         setFavouriteState(data.map((result) => result.data));
}

useEffect(() => {
   favouriteMovies();
 }, [])

 const openPopup = id => {
         axios(omdbapiurl + "&i=" + id).then(({ data }) => {
             let result = data;
             setState(prevState => {
                 return { ...prevState, selected: result }
             });
         });
     }

const closePopup = () => {
        setState(prevState => {
            return { ...prevState, selected: {} }
        });
    }

    return (
        <div>
            {favouriteState.length > 0 ? <Results results={favouriteState} openPopup={openPopup} /> : <h3> Favourite movies that you like! </h3>}
            {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        </div>
    )
}

export default Favourite;