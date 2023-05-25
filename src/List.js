import { useState } from 'react';

export default function List({todolist, postToDo, deleteToDo}){  //destructuring bc props are an object

    console.log(todolist)
    const [ input, setInput ] = useState("");

    function handleChange(e){
        setInput(e.target.value);
    }

    function handleAdd(){
        postToDo(input);  //use prop parent method to post new item/input to API + update todolist in frontend
        setInput("");
    }

    function handleDelete(id){
        deleteToDo(id);
    }

    return(
    <>
        <h1> My To-Do-List:</h1>
        <input type="text" value={input} onChange={handleChange}/>
        <button onClick={handleAdd}>add</button>
        <ul>
        {todolist.map((item, i) => 
            <>
            <li key={i}>{item.text}</li>
            <button>edit</button>
            <button>done!</button>
            <button onClick={() => handleDelete(item._id)}>delete</button>
            </>)}
        </ul>
    </>);
}