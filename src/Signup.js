import { useRef, useState } from 'react';
import axios from 'axios';

export default function Login(){

    const inputUsernameRef = useRef();  //for clearing inputs
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();

    const [ userName, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        //console.log(`username: ${userName}, email: ${email}, password: ${password}`);
        //an backend senden:

        inputUsernameRef.current.value = "";
        inputEmailRef.current.value = "";
        inputPasswordRef.current.value = "";
    }

    return(
    <div id="signup-container">
        <form onSubmit={handleSubmit}>
            <section className="form-section">
                <label htmlFor="username">Username: </label>
                <input ref={inputUsernameRef} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}></input>
            </section>
            <section className="form-section">
                <label htmlFor="email">Email: </label>
                <input  ref={inputEmailRef} type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}></input>
            </section>
            <section className="form-section">
                <label htmlFor="password">Password: </label>
                <input  ref={inputPasswordRef} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
            </section>
            <input className="app-button" type="submit" value="Account erstellen"/>
        </form>
    </div>);
}