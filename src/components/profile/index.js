import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../../services/auth-thunks.js";
import { getUser } from "../../services/auth-service";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCakeCandles, faMasksTheater, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

library.add(faCakeCandles, faMasksTheater, faEnvelope);

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
        console.log("uid" + uid);
        const payload = await getUser(uid);
        console.log("payload profile " + payload);
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

    const styles = {
        imgContainer: { position: "relative", textAlign: "center", color: "white", marginBottom: "10px" },
        mainContentImg: { display: "flex", width: "100%", height: "256px" },
        bottomLeftImg: { position: "absolute", bottom: "-15%", left: "16px", color: "white", width: "128px", height: "128px", borderRadius: "50%" },
        buttonContainer: { width: "100%", marginBottom: "20px" },
        buttonStyle: { backgroundColor: "white", color: "black", borderColor: "grey" }
    }

    return (
        <div>
            {profile && (
                <div>
                    <div style={styles.imgContainer}>
                        <img src="https://payload.cargocollective.com/1/11/367710/13568488/MOVIECLASSICSerikweb_2500_2500.jpg" style={styles.mainContentImg} />
                        <div><img src={profile.profilePhoto} style={styles.bottomLeftImg}></img></div>
                    </div>
                    <div className="d-flex flex-row-reverse" style={styles.buttonContainer}>
                        <Link to="/profile/edit">
                            <a class="btn btn-primary rounded-pill" href="#" role="button" style={styles.buttonStyle}><b>Edit Profile</b></a>
                        </Link>
                    </div>
                    <h4 className='m-0'><b>{profile.firstName} {profile.lastName}</b></h4>
                    <p>@{profile.username}</p>
                    <div className="d-flex justify-content-between align-items-center text-muted" style={{ width: '80%' }}>
                        <div><FontAwesomeIcon icon="fa-solid fa-masks-theater" /> {profile.genre}</div>
                        <div><FontAwesomeIcon icon="fa-solid fa-cake-candles" /> {new Date(profile.dob).toDateString()}</div>
                        <div><FontAwesomeIcon icon="fa-solid fa-envelope" /> {profile.email}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;