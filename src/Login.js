import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setToken, setLoggedin }){

    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleSubmit(e){
        e.preventDefault(); //prevents page from reloading just now
        //console.log(`email: ${email}, password: ${password}`);
        //an backend senden:
        const URL = `https://todoapi-fvit.onrender.com/login`;
        axios.post(URL, {
            email: email,
            password: password
        })
        .then(response => {
            //token in local storage setzen:
            localStorage.setItem("authtoken", response.data.token) ////wenn das Posten nicht funktioniert (also kein token zurückkommt), dann springt er in den catch block und setLoggedin findet nicht statt!
            //userdata in local storage setzen:
            localStorage.setItem("user", JSON.stringify(response.data.user));
            //state vars setzen:
            setToken(response.data.token);
            setLoggedin(true);
            //setUser:
            //setUser(response.data.user);
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