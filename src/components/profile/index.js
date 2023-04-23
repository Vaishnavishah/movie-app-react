import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useLocation, useNavigate} from "react-router";
import { profileThunk } from "../../services/auth-thunks.js";
import { Link } from 'react-router-dom';
import {getUser} from "../../services/auth-service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

import UserReview from "../review-in-profile";



function Profile() {

    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const func = async () => {
        // run asynchronous tasks here
        const { payload } = await dispatch(profileThunk());
        console.log(payload);
        if (payload === undefined) {
            navigate("/login");
            return null;
        } else {
            setProfile(payload);
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

    const styles = {
        imgContainer: { position: "relative", textAlign: "center", color: "white", marginBottom: "10px" },
        mainContentImg: { display: "flex", width: "100%", height: "256px" },
        bottomLeftImg: { position: "absolute", bottom: "-15%", left: "16px", color: "white", width: "128px", height: "128px", borderRadius: "50%" },
        buttonContainer: { width: "100%", marginBottom: "20px" },
        buttonStyle: { backgroundColor: "white", color: "black", borderColor: "grey" }
    }

    return (
    <>
        <div>
            {profile && (
                <div>
                    <div style={styles.imgContainer}>
                        <img src="images/download1.png" style={styles.mainContentImg} />
                        {profile.photo ? <div><img src={profile.profilePhoto} style={styles.bottomLeftImg}></img></div> : <div><img src="images/user.png" style={styles.bottomLeftImg}></img></div> }
                    </div>
                    <div className="d-flex flex-row-reverse" style={styles.buttonContainer}>
                        <Link to="/profile/edit">
                            <a class="btn btn-primary rounded-pill" href="#" role="button" style={styles.buttonStyle}><b>Edit Profile</b></a>
                        </Link>
                    </div>
                    <h4 className='m-0'><b>{profile.firstName} {profile.lastName}</b></h4>
                    <p>@{profile.username}</p>
                    <div className="d-flex justify-content-between align-items-center text-muted" style={{ width: '80%' }}>
                        {profile.genre ? <div><FontAwesomeIcon icon={solid("film")} /> &nbsp; {profile.genre}</div> : null}
                        {profile.dob ? <div><FontAwesomeIcon icon={solid("cake-candles")} /> &nbsp; {new Date(profile.dob).toDateString()}</div>: null}
                        <div><FontAwesomeIcon icon={solid("envelope")} /> &nbsp; {profile.email}</div>
                    </div>
                </div>
            )}
        </div>
        {profile ? <UserReview profile = {profile}/> : null}
        </>
    );
}

export default Profile;