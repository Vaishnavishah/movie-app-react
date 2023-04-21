import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useLocation, useNavigate} from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../../services/auth-thunks.js";
import {getUser} from "../../services/auth-service";

function Profile() {

    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = () => { dispatch(updateUserThunk(profile)); };
    const {pathname} = useLocation();
    // const openComponent = useCallback(() => {
    //     navigate('/profile/edit');
    // }, [])
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
        console.log("uid" + uid);
        const payload = await getUser(uid);
        console.log("payload profile " + payload);
        setProfile(payload);
    }
    useEffect(() => {
        const paths = pathname.split('/');
        if(paths.length === 3) {
            const uid = paths[2];
            func2(uid);
        } else {
            func();
        }
    }, []);

    return (
        <div>
            <h1>Profile Screen</h1>
            {profile && (
                <div>
                    <div>
                        <label>First Name</label>
                        <input type="text"
                               value={profile.firstName}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       firstName: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text"
                               value={profile.lastName}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       lastName: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <input type="text"
                               value={profile.dob}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       dob: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div>
                        <label>Profile Photo</label>
                        <input type="text"
                               value={profile.profilePhoto}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       profilePhoto: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text"
                               value={profile.email}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       email: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div>
                        <label>Genres</label>
                        <input type="text"
                               value={profile.genre}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       genre: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                </div>
            )}
            <button
                onClick={() => {
                    dispatch(logoutThunk());
                    navigate("/login");
                }}>
                Logout</button>
            <button
                onClick={() => {
                    dispatch(updateUserThunk(profile));
                }}>
                Update</button>
            <button onClick={save}>Save</button>
        </div>
    );
}

export default Profile;