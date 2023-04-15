import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import Results from "../movies/Results";

function Favourite() {
const favouriteArray = useSelector(state => state.favourites);

const [state, setState] = useState([]);

const omdbapiurl = "http://www.omdbapi.com/?apikey=dfe6d885";

const favouriteMovies = async () => {
    const promises = favouriteArray.map(favourite => axios(omdbapiurl + "&i=" + favourite.movieID))
         const data = await Promise.all(promises);
         setState(data.map((result) => result.data));
}

useEffect(() => {
   favouriteMovies();
 }, [])

 const openPopup = id => {
         axios(omdbapiurl + "&i=" + id).then(({ data }) => {
             let result = data;

             console.log(result);

             setState(prevState => {
                 return { ...prevState, selected: result }
             });
         });
     }

    return (
        <div>
            {state.length > 0 ? <Results results={state} openPopup={openPopup} /> : <h3> Favourite movies that you like! </h3>}
        </div>
    )
}

export default Favourite;