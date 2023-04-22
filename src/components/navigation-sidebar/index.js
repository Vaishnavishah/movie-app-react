import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../services/auth-thunks";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilm, faStar, faUser, faCircleXmark, faCircleCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faFilm, faStar, faUser, faCircleXmark, faCircleCheck, faUserPlus)


const NavigationSidebar = () => {

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const paths = pathname.split('/')
    const active = paths[2];
    const { currentUser } = useSelector(state => state.user)

    return (
        <div>
            {
                currentUser ?
                    (
                        <div className="list-group" >
                            < Link to='/' className={`list-group-item ${active === 'movies' ? 'active' : ''}  d-flex justify-content-start align-items-center sidebar-list-item p-xl-20`} >
                                <FontAwesomeIcon icon="fa-solid fa-film" /> <span className="d-none d-xl-block ms-3"> Movies</span>
                            </Link >
                            <Link to='/favourites' className={`list-group-item ${active === 'favourites' ? 'active' : ''} d-flex justify-content-start align-items-center sidebar-list-item p-xl-20`}>
                                <FontAwesomeIcon icon="fa-solid fa-star" /> <span className="d-none d-xl-block ms-3"> Favourites</span>
                            </Link>
                            <Link to='/profile' className={`list-group-item ${active === 'profile' ? 'active' : ''} d-flex justify-content-start align-items-center sidebar-list-item p-xl-20`}>
                                <FontAwesomeIcon icon="fa-solid fa-user" /> <span className="d-none d-xl-block ms-3"> Profile</span>
                            </Link>
                            <Link className={`list-group-item d-flex justify-content-start align-items-center sidebar-list-item p-xl-20`} onClick={() => {
                                dispatch(logoutThunk()).then(() => {
                                    navigate('/login');
                                })
                            }}>
                                <FontAwesomeIcon icon="fa-solid fa-circle-xmark" /> <span className="d-none d-xl-block ms-3"> Logout</span>
                            </Link>
                        </div >
                    ) :
                    (
                        <div className="list-group" >
                            < Link to='/' className={`list-group-item ${active === 'movies' ? 'active' : ''}  d-flex justify-content-start align-items-center sidebar-list-item p-xl-20`} >
                                <FontAwesomeIcon icon="fa-solid fa-film" /> <span className="d-none d-xl-block ms-3"> Movies</span>
                            </Link >
                            < Link to='/login' className={`list-group-item ${active === 'login' ? 'active' : ''}  d-flex justify-content-start align-items-center sidebar-list-item p-xl-20`} >
                                <FontAwesomeIcon icon="fa-solid fa-circle-check" /> <span className="d-none d-xl-block ms-3"> Login</span>
                            </Link >
                            < Link to='/signup' className={`list-group-item ${active === 'signup' ? 'active' : ''}  d-flex justify-content-start align-items-center sidebar-list-item p-xl-20`} >
                                <FontAwesomeIcon icon="fa-solid fa-user-plus" /> <span className="d-none d-xl-block ms-3"> Signup</span>
                            </Link >
                        </div >
                    )
            }
        </div>
    );

};
export default NavigationSidebar;


