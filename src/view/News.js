import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Todo from "./Todo";
function News() {
  const [add, setAdd] = useState("");
  const [todos, setTodos] = useState([
    { id: "todo1", title: "add", type: "Hung" },
    { id: "todo2", title: "delete", type: "Hung" },
    { id: "todo3", title: "abc", type: "Trieu" },
    { id: "todo4", title: "xyz", type: "Trieu" },
  ]);

  useEffect(() => {}, [add, todos]);
  const handleEventClick = () => {
    // setName(add)
    if (!add) {
      alert("empty input");
      return;
    }
    let newTodo = {
      id: Math.floor(Math.random() * 100),
      title: add,
      type: " Hung",
    };
    setTodos([...todos, newTodo]);
    setAdd("");
  };

  const handleOnchangeInput = (e) => {
    setAdd(e);
  };

  const deleteDataTodo = (id) => {
    let currentTodo = todos;
    currentTodo = currentTodo.filter((item) => item.id !== id);
    setTodos(currentTodo);
  };

  return (
    <div>
      <Todo todos={todos} title={"All-todos"} deleteDataTodo={deleteDataTodo} />
      <input type="text" value={add} onChange={(e)=>handleOnchangeInput(e.target.value)} />
      <button type="button" onClick={()=>handleEventClick()}>
        Click
      </button>
      <NavLink to="/home"> Back to Home</NavLink>
    </div>
  );
}

export default News;
