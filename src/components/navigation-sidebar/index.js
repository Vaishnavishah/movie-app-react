import React from "react";
import {Link} from "react-router-dom";
import {useLocation, useNavigate} from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../services/auth-thunks";

const NavigationSidebar = () => {

    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const paths = pathname.split('/')
    const active = paths[2];

    return (
        <div className="list-group">
            <Link to="/" className={`list-group-item ${active === 'movies'?'active':''}`}>
                Movies
            </Link>
            <Link to="/series" className={`list-group-item ${active === 'series'?'active': ''}`}>
                Series
            </Link>
            <Link to="/favourites" className={`list-group-item ${active === 'favourites'?'active': ''}`}>
                            Favourites
                        </Link>
            <Link to="/profile" className={`list-group-item ${active === 'profile'?'active':''}`}>
                Profile
            </Link>
            {/*<Link to="/login" className={`list-group-item ${active === 'login'?'active':''}`}>*/}
            {/*    Login*/}
            {/*</Link>*/}
            <Link to="/signup" className={`list-group-item ${active === 'signup'?'active':''}`}>
                SignUp
            </Link>
            <Link className={`list-group-item`} onClick={() => {
                dispatch(logoutThunk()).then(() => {
                    navigate('/login');
                })
            }}>
                Logout
            </Link>
        </div>
    );
};
export default NavigationSidebar;

