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
    <div id="list-container">
        <div id="list-sheet">
            <h1> MY TO-DO LIST:</h1>
            <div id="add-container">
                <input type="text" value={input} onChange={handleChange}/>
                <button id="add-btn" onClick={handleAdd}>+</button>
            </div>

            <ul>
            {todolist.map((item, index) => 
                <div id="list-item">
                    <li key={index} ref={ref => listItemRefs.current[index] = ref} style={{textDecoration: item.status === true ? "line-through" : "none"}}>{item.text}</li>
                    <div id="list-item-btns">
                        <button id="done-btn" onClick={() => handleDone(index, item._id, item.status)}>&#10004;</button>
                        <button onClick={() => handleDelete(item._id)}>&#10060;</button>
                    </div>
                </div>)}
            </ul>
        </div>
    </div>);
}