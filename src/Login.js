import { useRef, useState } from 'react';

export default function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleSubmit(e){
        e.preventDefault(); //prevents page from reloading just now
        //console.log(`email: ${email}, password: ${password}`);
        //an backend senden:

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