import { useState, useRef } from 'react';

export default function List({todolist, postToDo, changeStatus, deleteToDo}){  //destruct. bc props is object

    const [ input, setInput ] = useState("");
    const listItemRefs = useRef([]);

    function handleChange(e){
        setInput(e.target.value);
    }

    function handleAdd(){
        postToDo(input);
        setInput("");
    }

    function handleDone(index, id, status){
        listItemRefs.current[index].style.textDecoration = listItemRefs.current[index].style.textDecoration === "line-through" ? "" : "line-through";
        changeStatus(id, status);
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
        {todolist.map((item, index) => 
            <>
            <li key={index} ref={ref => listItemRefs.current[index] = ref} style={{textDecoration: item.status === true ? "line-through" : "none"}}>{item.text}</li>
            <button onClick={() => handleDone(index, item._id, item.status)}>done!</button>
            <button onClick={() => handleDelete(item._id)}>delete</button>
            </>)}
        </ul>
    </>);
}