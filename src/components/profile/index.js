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
    const openComponent = useCallback(() => {
        navigate('/profile/edit');
    }, [])
    const func = async () => {
        // run asynchronous tasks here
        const { payload } = await dispatch(profileThunk());
        if (payload === undefined) {
            await navigate("/signup");
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
                </div>
            )}
            <button
                onClick={() => {
                    dispatch(logoutThunk());
                    navigate("/login");
                }}>
                Logout</button>
            <button onClick={save}>Save</button>
        </div>
    );
}

export default Profile;