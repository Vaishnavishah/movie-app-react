import React, {useState, useEffect} from "react";
import axios from "axios";
import Popup from "../moviedetail/Popup";
import Results from "./Results";
import SearchResults from "../movies/Results";
import Search from "./Search";

function PopularMovies() {

    const [homeState, setHomeState] = useState({results:[]});
    const tmdbapiurl = "https://api.themoviedb.org/3/movie/popular?api_key=0d0e5e0e7c64ee865ffaf322789a7bda&language=en-US`";
    const omdbapiurl = "http://www.omdbapi.com/?apikey=dfe6d885";
    const [state, setState] = useState({
                                    s: "",
                                    results: [],
                                    selected: {}
                                });

    const popular = () => {
        axios(tmdbapiurl).then(({ data }) => {

                    let results = data.results;
                    console.log(results);
                    setHomeState(prevState => {
                        return { ...prevState, results: results }
                    })
                });

    }

    const handleInput = (e) => {
            let s = e.target.value;

            console.log("Inside if");
            setState(prevState => {
                            return { ...prevState, s: s }
                        });


        }

    const search = (e) => {
            if (e.key === "Enter") {
                if(state.s) {
                    console.log("Inside if 2")
                    console.log("state.s", state.s);
                    axios(omdbapiurl + "&s=" + state.s).then(({ data }) => {
                        let results = data.Search;

                        setState(prevState => {
                            return { ...prevState, results: results }
                        })
                    });
                } else {
                    setState({
                             s: "",
                             results: [],
                             selected: {}
                     });
                }
            }
        }

    const openPopup = id => {
            axios(omdbapiurl + "&i=" + id).then(({ data }) => {
                let result = data;

                console.log(result);

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
            <Search handleInput={handleInput} search={search} />
            {state.results.length > 0 ? <SearchResults results={state.results} openPopup={openPopup} /> :
            <Results results = {homeState.results} openPopup={openPopup} /> }
            {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        </div>
    )
}

export default PopularMovies;