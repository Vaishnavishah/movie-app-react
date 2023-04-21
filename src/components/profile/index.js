import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../../services/auth-thunks.js";
import { getUser } from "../../services/auth-service";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationDot, faCakeCandles, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import EditProfile from "./edit-profile.js";

library.add(faLocationDot, faCakeCandles, faCalendarDays);

function Profile() {

    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const func = async () => {
        // run asynchronous tasks here
        const { payload } = await dispatch(profileThunk());
        console.log(payload);
        if (payload === undefined) {
            navigate("/login");
            return null;
        } else {
            await setProfile(payload);
        }
    };
    const func2 = async (uid) => {
        const payload = await getUser(uid);
        setProfile(payload);
    }
    useEffect(() => {
        const paths = pathname.split('/');
        if (paths.length === 3) {
            const uid = paths[2];
            func2(uid);
        } else {
            func();
        }
    }, []);

    return (
        <div>
            {profile && (
                <div>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Full Name</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            {profile.firstName} {profile.lastName}
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Email</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            {profile.email}
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Date of Birth</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            {new Date(profile.dob).toDateString()}
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Genre</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            {profile.genre}
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Username</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            {profile.username}
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Password</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            *****
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-3">
                            <button class="btn btn-info" href="#" role="button" onClick={() => navigate("/profile/edit")}>Edit Profile</button>
                        </div>
                        <div class="col-sm-3">
                            <button class="btn btn-info" href="#" role="button" onClick={() => {
                                dispatch(logoutThunk()).then(() => {
                                    navigate("/login")
                                })
                            }}>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;