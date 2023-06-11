const Todo = (props) => {
  // const todos = props.todos;
  const { todos, title, deleteDataTodo } = props;
  console.log(props)
  const handleDelete = (id) => {
    deleteDataTodo(id);
  };
  return (
    <div className="todo-container">
      <div className="title">{title}</div>
      {todos?.map((todo) => {
        return (
          <div key={todo.id}>
            <div className="todo-child">
              {" "}
              {todo.title}
              &nbsp; &nbsp; <span onClick={() => handleDelete(todo.id)}>x</span>
            </div>
          </div>
        );
      })}

      <hr />
    </div>
  );
};

export default Todo;
