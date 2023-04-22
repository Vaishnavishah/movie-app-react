import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Results from "../movies/Results";
import Popup from "../moviedetail/Popup";
import {profileThunk} from "../../services/auth-thunks";
import {findFavouriteByUser} from "../../services/favourite/favourite-service";
import {findFavouriteByUserThunk} from "../../services/favourite/favourite-thunk";

function Favourite() {

const {favouriteArray, loading} = useSelector(state => state.favourite);
const {currentUser} = useSelector(state => state.user)
const [favArray, setFavArray] = useState([]);
const [userid, setUserid] = useState(null);
const [flag, setFlag] = useState(false);
const dispatch = useDispatch();

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

useEffect( () => {
    async function fetchData() {
         const {payload} = await dispatch(profileThunk());


         console.log("currentUser", currentUser);
         if(payload) {
             setUserid(payload._id);
             dispatch(findFavouriteByUserThunk(payload._id));
         } else {
             setUserid(null);
             dispatch(findFavouriteByUserThunk("dummy"));
         }
    }
    fetchData();
 }, [flag])

useEffect(() => {
    favouriteMovies();
}, [favouriteArray])

 const openPopup = id => {
         axios(omdbapiurl + "&i=" + id).then(({ data }) => {
             let result = data;
             setState(prevState => {
                 return { ...prevState, selected: result }
             });
             setFlag(true);
         });

     }

const closePopup = () => {
        setState(prevState => {
            return { ...prevState, selected: {} }
        });
        setFlag(false);

    }

    return (
        <div>
        {loading &&
               <h3> Loading </h3>}

            {favouriteArray.length > 0 ? <Results results={favouriteState} openPopup={openPopup} /> : userid != null ? <h3>Like the movies!!</h3> : <h3> Login to like movies!</h3>}
            {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        </div>
    )
}

export default Favourite;