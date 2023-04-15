import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {registerThunk} from "../../services/auth-thunks";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [dob, setDob] = useState("");
    const [profilePhoto, setprofilePhoto] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = {
      username:username,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      profilePhoto: profilePhoto,
        password: password,
        email: email
    };

    const signup = async () => {
        try {
            await dispatch(registerThunk(user));
            await navigate("/profile");
        } catch (e) {
            alert(e);
        }
    }
    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control" type="text" value={username}
                   onChange={(event) => setUsername(event.target.value)}
                   placeholder="username"/>
            <input className="mb-2 form-control" type="text" value={firstName}
                   onChange={(event) => setfirstName(event.target.value)}
                   placeholder="First Name"/>
            <input className="mb-2 form-control" type="text" value={lastName}
                   onChange={(event) => setlastName(event.target.value)}
                   placeholder="Last Name"/>
            <input className="mb-2 form-control" type="date" value={dob}
                   onChange={(event) => setDob(event.target.value)}
                   placeholder="Date"/>
            <input className="mb-2 form-control" type="file" value={profilePhoto}
                   onChange={(event) => setprofilePhoto(event.target.value)}
                   placeholder="Profile Photo"/>
            <input className="mb-2 form-control" type="password" value={password}
                   onChange={(event) => setPassword(event.target.value)}
                   placeholder="Password"/>
            <input className="mb-2 form-control" type="text" value={email}
                   onChange={(event) => setEmail(event.target.value)}
                   placeholder="Email"/>
            <button onClick={signup}
                    className="btn btn-primary mb-5">Signup
            </button>
        </div>
    );
}
export default Signup;