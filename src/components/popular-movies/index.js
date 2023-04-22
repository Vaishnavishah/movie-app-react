import React, {useState, useEffect} from "react";
import axios from "axios";
import Popup from "../moviedetail/Popup";
import Results from "./Results";
import SearchResults from "../movies/Results";
import Search from "./Search";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const SEARCH_URL = `${SERVER_API_URL}/search`;

function PopularMovies() {

    const [homeState, setHomeState] = useState({results:[]});
    const omdbapiurl = "http://www.omdbapi.com/?apikey=dfe6d885";
    const [state, setState] = useState({
                                    s: "",
                                    results: [],
                                    selected: {}
                                });

    const popular = () => {
        axios(SEARCH_URL).then(({ data }) => {

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

            axios(SEARCH_URL, { params: {criteria: s}}).then(({ data }) => {
                let results = data.Search;

                setState(prevState => {
                    return { ...prevState, results: results }
                })
            });
        }

    // const search = (e) => {
    //         if (e.key === "Enter") {
    //             if(state.s) {
    //                 axios(searchUrl, { params: {criteria: state.s}}).then(({ data }) => {
    //                     let results = data.Search;

    //                     setState(prevState => {
    //                         return { ...prevState, results: results }
    //                     })
    //                 });
    //             } else {
    //                 setState({
    //                          s: "",
    //                          results: [],
    //                          selected: {}
    //                  });
    //             }
    //         }
    //     }

    const openPopup = (id) => {
        console.log("id id", id);
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