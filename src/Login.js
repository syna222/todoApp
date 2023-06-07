import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setUser, setToken, setLoggedin }){

    const baseURL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleSubmit(e){
        e.preventDefault(); //prevents page from reloading just now
        //console.log(`email: ${email}, password: ${password}`);
        //an backend senden:
        const URL = `${baseURL}/login`;
        axios.post(URL, {
            email: email,
            password: password
        })
        .then(response => {
            localStorage.setItem("authtoken", response.data.token) ////wenn das Posten mit Token-Ausgabe nicht funktioniert -> catch block + kein setLoggedIn
            localStorage.setItem("user", JSON.stringify(response.data.user));
            //state vars setzen:
            setToken(response.data.token);
            setLoggedin(true);
            setUser(response.data.user);
            navigate("/");
        
        })
        .catch(err => alert(err.response.data));
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

    return(
    <div id="login-container">
        <form onSubmit={handleSubmit}>
            <section className="form-section">
                <label htmlFor="">Email: </label>
                <input ref={emailRef} type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </section>
            <section className="form-section">
                <label htmlFor="">Password: </label>
                <input ref={passwordRef} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
            </section>
            <input type="submit"></input>
        </form>
    </div>);
}