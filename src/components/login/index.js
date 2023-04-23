import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginThunk} from "../../services/auth-thunks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const {currentUser} = useSelector(state => state.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLogin] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async () => {
        if (!username || !password) {
            setError("Please fill in all required fields.");
            return;
        }
        try {
            await dispatch(loginThunk({ username, password }));
            if(!currentUser) {
                toast.error('Incorrect Password or Username', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } else {
                await setLogin(true);
                await navigate("/profile");
            }
        } catch (e) {
            alert(e);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <input className="mb-2 form-control"
                   type="text" value={username}
                   onChange={(event) => setUsername(event.target.value)}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   type="password" value={password}
                   onChange={(event) => setPassword(event.target.value)}
                   placeholder="password"/>
            {error && <p className="text-danger">{error}</p>}
            <button onClick={login} className="btn btn-primary mb-5">
                Login
            </button>
            <ToastContainer/>
        </div>
    );
};

export default Login;