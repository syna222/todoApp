import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import List from "./List";

function App() {

  const navigate = useNavigate();
  const [ loggedIn, setLoggedin ] = useState(false);  //gets passed down to Login component
  const [ token, setToken ] = useState(localStorage.getItem("authtoken")); // passed down to Login component
  const [ list, setList ] = useState([]);

  useEffect(() => {
    if (token) {
      setLoggedin(true);  //based on token presence (in localStorage), login is kept. 
    }
  }, [token]);


  function getCurrentList(){
    axios.get("https://todoapi-fvit.onrender.com/todos")
    .then(response => setList(response.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getCurrentList();
  }, []);

  function postToDo(text){ //has to have the field name required by the API!
    const status = false;
    axios.post("https://todoapi-fvit.onrender.com/todos", {text, status}, {
      headers: {
        "authtoken": token
      }
    })
    .then(response => setList(prevList => [...prevList, response.data]))
    .catch(err => console.log(err))
  }

  function changeStatus(id, status){
    status = !status;  //toggle status
    console.log(`newStatus: ${status}`)
    axios.put(`https://todoapi-fvit.onrender.com/todos/${id}`, {status}, {
      headers: {
        "authtoken": token
      }
    })
    .then(() => getCurrentList())
    .catch(err => console.log(err))
  }

  function deleteToDo(id){
    axios.delete(`https://todoapi-fvit.onrender.com/todos/${id}`, {
      headers: {
        "authtoken": token
      }
    })
    .then(() => getCurrentList())
    .catch(err => console.log(err))
  }

  function handleLogout(e){
    e.preventDefault();
    if(loggedIn){           //überflüssig?
        //token aus LocalStorage nehmen:
        localStorage.removeItem("authtoken"); 
        localStorage.removeItem("user");
        //login auf false:
        setLoggedin(false);
        //muss setToken auf undefined?
        setToken();
        navigate("/");
    }
  }

  console.log("logged in is:", loggedIn);

  return (
    <div className="App">
      <nav>
        <NavLink className="nav-elem" to="/">
          HOME
        </NavLink>
        {!loggedIn && <><NavLink className="nav-elem" to="/signup">
          SIGN UP
        </NavLink>
        <NavLink className="nav-elem" to="/login">
          LOGIN
        </NavLink></>}
        {loggedIn && <><NavLink className="nav-elem" to="/list">
          LIST
        </NavLink>
        <button onClick={handleLogout}>
          LOGOUT
        </button></>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login setToken={setToken} setLoggedin={setLoggedin}/>}/>
        <Route path="/list" element={<List todolist={list} postToDo={postToDo} deleteToDo={deleteToDo} changeStatus={changeStatus}/>}/>
      </Routes>
    </div>
  );
}

export default App;
