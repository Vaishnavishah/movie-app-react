import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../services/auth-thunks";
import { Gallery } from "react-grid-gallery";


const Signup = () => {
    const [username, setUsername] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [dob, setDob] = useState("");
    const [profilePhoto, setprofilePhoto] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [genre, setGenre] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

       const images = [
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/2c659933850498.56ba69ac2e080.png",
                     width: 10,
                     height: 10
              },
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png",
                     width: 10,
                     height: 10
              },
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9fa8a33850498.56ba69ac2cc3a.png",
                     width: 10,
                     height: 10
              },
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb3a8833850498.56ba69ac33f26.png",
                     width: 10,
                     height: 10,
              },
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png",
                     width: 10,
                     height: 10,
              },
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/363e3e33850498.56ba69ac3183c.png",
                     width: 10,
                     height: 10,
              },
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png",
                     width: 10,
                     height: 10,
              },
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/fd69a733850498.56ba69ac2f221.png",
                     width: 10,
                     height: 10,
              },
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/c7906d33850498.56ba69ac353e1.png",
                     width: 10,
                     height: 10,
              },
              {
                     src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png",
                     width: 10,
                     height: 10,
              }
       ];

       const handleSelect = (index, item, event) => {
              setprofilePhoto(images[index].src);
       };


       const user = {
              username: username,
              firstName: firstName,
              lastName: lastName,
              dob: dob, genre: genre,
              profilePhoto: profilePhoto,
              password: password,
              email: email
       };

    const signup = async () => {
        if(!user.username || !user.firstName || !user.lastName || !user.password || !user.email) {
            setError("Please fill in all required fields.");
            return;
        }
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
                            placeholder="username" />
                     <input className="mb-2 form-control" type="text" value={firstName}
                            onChange={(event) => setfirstName(event.target.value)}
                            placeholder="First Name" />
                     <input className="mb-2 form-control" type="text" value={lastName}
                            onChange={(event) => setlastName(event.target.value)}
                            placeholder="Last Name" />
                     <input className="mb-2 form-control" type="date" value={dob}
                            onChange={(event) => setDob(event.target.value)}
                            placeholder="Date" />
                     <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                   <button class="btn btn-outline-secondary" type="button" onClick={() => setImageSelector(!imageSelector)}>Choose Profile Image</button>
                            </div>
                            <input type="text" className="form-control" placeholder="" aria-label="" value={profilePhoto} aria-describedby="basic-addon1" />
                     </div>
                     {imageSelector && <Gallery images={images} onSelect={handleSelect} />}
                     <input className="mb-2 form-control" type="password" value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password" />
                     <input className="mb-2 form-control" type="text" value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email" />
                     <input className="mb-2 form-control" type="text" value={genre}
                            onChange={(event) => setGenre(event.target.value)}
                            placeholder="Genres" />
                  {error && <p className="text-danger">{error}</p>}
                     <button onClick={signup}
                            className="btn btn-primary mb-5">Signup
                     </button>
              </div>
       );
}
export default Signup;