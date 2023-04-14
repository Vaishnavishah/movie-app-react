import Search from "./Search";
import Results from "./Results";
import React, {useState} from "react";
import axios from "axios";
import Popup from "../moviedetail/Popup";

function Movies() {

    const [state, setState] = useState({
                                           s: " ",
                                           results: [],
                                           selected: {}
                                       });

    const [homeState, setHomeState] = useState({results:[]});
    const omdbapiurl = "http://www.omdbapi.com/?apikey=dfe6d885";
    const tmdbapiurl = "https://api.themoviedb.org/3/movie/popular?api_key=0d0e5e0e7c64ee865ffaf322789a7bda&language=en-US`";

    const search = (e) => {
        if (e.key === "Enter") {
            console.log("state.s", state.s);
            axios(omdbapiurl + "&s=" + state.s).then(({ data }) => {
                let results = data.Search;

                setState(prevState => {
                    return { ...prevState, results: results }
                })
            });
        }
    }

    const popular = () => {
        axios(tmdbapiurl).then(({ data }) => {
                    let results = data.Search;

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

    return (
        <div>
            <Search handleInput={handleInput} search={search} />
            <Results results={state.results} openPopup={openPopup} />
            {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        </div>
    )
}

export default Movies;