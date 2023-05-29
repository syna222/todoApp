import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import List from "./List";

function App() {

  const [ list, setList ] = useState([]);

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
    axios.post("https://todoapi-fvit.onrender.com/todos", {text, status})
    .then(response => setList(prevList => [...prevList, response.data]))
    .catch(err => console.log(err))
  }

  function changeStatus(id, status){
    status = !status;  //toggle status
    console.log(`newStatus: ${status}`)
    axios.put(`https://todoapi-fvit.onrender.com/todos/${id}`, {status})
    .then(() => getCurrentList())
    .catch(err => console.log(err))
  }

  function deleteToDo(id){
    axios.delete(`https://todoapi-fvit.onrender.com/todos/${id}`)
    .then(() => getCurrentList())
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <nav>
        <NavLink className="nav-elem" to="/">
          HOME
        </NavLink>
        <NavLink className="nav-elem" to="/signup">
          SIGN UP
        </NavLink>
        <NavLink className="nav-elem" to="/login">
          LOGIN
        </NavLink>
        <NavLink className="nav-elem" to="/list">
          LIST
        </NavLink>
        <button>
          LOGOUT
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/list" element={<List todolist={list} postToDo={postToDo} deleteToDo={deleteToDo} changeStatus={changeStatus}/>}/>
      </Routes>
    </div>
  );
}

export default App;
