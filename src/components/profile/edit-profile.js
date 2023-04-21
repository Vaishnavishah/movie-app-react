import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { profileThunk, updateUserThunk } from "../../services/auth-thunks.js";
import { useNavigate } from 'react-router';

function EditProfile() {
    const [profile, setProfile] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [genre, setGenre] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = () => {
        dispatch(updateUserThunk({
            ...profile,
            firstName,
            lastName,
            email,
            dob,
            genre,
            password
        })).then(() => {
            navigate("/profile")
        })
    };

    useEffect(() => {
        dispatch(profileThunk()).then(({payload}) => {
            if (payload === undefined) {
                navigate("/login");
                return null;
            } else {
                setProfile(payload);
                setFirstName(payload.firstName);
                setLasttName(payload.lastName);
                setEmail(payload.email);
                setDob(payload.dob);
                setGenre(payload.genre);
                setPassword(payload.password);
                setUsername(payload.username);
            }
        })         
    }, [])

    return (
        <div>
            <div class="row">
                <div class="col-sm-3">
                    <h6 class="mb-0">First Name</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input className="mb-2 form-control" type="text" value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder={firstName} />
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-3">
                    <h6 class="mb-0">Last Name</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input className="mb-2 form-control" type="text" value={lastName}
                        onChange={(event) => setLasttName(event.target.value)}
                        placeholder={lastName} />
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input className="mb-2 form-control" type="text" value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={email} />
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-3">
                    <h6 class="mb-0">Date of Birth</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input className="mb-2 form-control" type="date" value={dob}
                        onChange={(event) => setDob(event.target.value)}
                        placeholder={dob} />
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-3">
                    <h6 class="mb-0">Genre</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input className="mb-2 form-control" type="text" value={genre}
                        onChange={(event) => setGenre(event.target.value)}
                        placeholder={genre} />
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-3">
                    <h6 class="mb-0">Username</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                <input className="mb-2 form-control" type="text" value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder={username} 
                        disabled/>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-3">
                    <h6 class="mb-0">Password</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input className="mb-2 form-control" type="text" value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder={password} />
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-3">
                    <button class="btn btn-info" href="#" role="button" onClick={() => save()}>Save</button>
                </div>
            </div>
        </div>

    )
}

export default EditProfile