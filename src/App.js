import { useEffect, useState } from 'react';
import List from "./List";
import axios from 'axios';

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

  function postToDo(text){ //this has to have the field name required by the API!
    const status = false;
    axios.post("https://todoapi-fvit.onrender.com/todos", {text, status})
    .then(response => setList(prevList => [...prevList, response.data]))  //API was programmed to return new list item
    .catch(err => console.log(err))
  }

  function deleteToDo(id){
    axios.delete(`https://todoapi-fvit.onrender.com/todos/${id}`)
    .then(() => getCurrentList())
    .catch(err => console.log(err))
  }


  return (
    <div className="App">
      <List todolist={list} postToDo={postToDo} deleteToDo={deleteToDo}/>
    </div>
  );
}

export default App;
