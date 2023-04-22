import React, {useState, useEffect} from "react";
import axios from "axios";
import Popup from "../moviedetail/Popup";
import Results from "./Results";
import SearchResults from "../movies/Results";
import Search from "./Search";

function PopularMovies() {

    const [homeState, setHomeState] = useState({results:[]});
    const omdbapiurl = "http://www.omdbapi.com/?apikey=dfe6d885";
    const searchUrl = "http://localhost:4000/api/search";
    const [state, setState] = useState({
                                    s: "",
                                    results: [],
                                    selected: {}
                                });

    const popular = () => {
        axios(searchUrl).then(({ data }) => {

                    let results = data.results;
                    setHomeState(prevState => {
                        return { ...prevState, results: results }
                    })
                });

    }

    const handleInput = (e) => {
            let s = e.target.value;
            setState(prevState => {
                return { ...prevState, s: s }
            });

            axios(searchUrl, { params: {criteria: s}}).then(({ data }) => {
                let results = data.Search;

                setState(prevState => {
                    return { ...prevState, results: results }
                })
            });
        }

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
useEffect(() => {
   popular();
 }, [])


    return (
        <div>
            <Search handleInput={handleInput} />
            {state.results&& state.results.length > 0 ? <SearchResults results={state.results} openPopup={openPopup} /> :
            <Results results = {homeState.results} openPopup={openPopup} /> }
            {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        </div>
    )
}

export default PopularMovies;