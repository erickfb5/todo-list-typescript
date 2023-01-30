import { useState, useEffect } from "react";
import "./App.css";

import "./App.css";


const App: React.FC = () => {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>(
    JSON.parse(localStorage.getItem("todos") || "{}") || []
  );

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };
  const toggleTodo = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index: number) =>
    setTodos(todos.filter((_, i) => i !== index));

  return (
    <div>
      <h1>Todos</h1>
      <form
        className="form"
        id="form"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          id="input"
          className="input"
          placeholder="Enter your todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <small>
        Left click to toggle completed. <br /> Right click to delete todo
      </small>
      <ul id="todos" className="todos">
        {todos.map((todo, i) => (
          <li
            key={i}
            onClick={() => toggleTodo(i)}
            onContextMenu={(e) => {
              e.preventDefault();
              deleteTodo(i);
            }}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
