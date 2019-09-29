import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import "./styles.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleTodoValue = event => {
    setTodoValue(event.target.value);
  };

  const addTodo = () => {
    setTodoList([...todoList, todoValue]);
    setTodoValue("");
    addTodoList(todoValue);
  };

  const deleteTodo = v => {
    const deletedTodoList = todoList.filter(todo => todo !== v);
    setTodoList(deletedTodoList);
    updateJson(deletedTodoList);
  };

  const addTodoList = v => {
    updateJson([...todoList, v]);
  };

  const initializeTodoList = () => {
    updateJson([]);
    getJson();
  };

  const getJson = () => {
    setLoading(true);
    axios
      .get(
        "https://jsonbox.io/box_9691f59c4ba3b33afebd/5d9040a271cce900175d6780"
      )
      .then(response => {
        setTodoList(response.data.todos);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateJson = data => {
    setUpdating(true);
    axios
      .put(
        "https://jsonbox.io/box_9691f59c4ba3b33afebd/5d9040a271cce900175d6780",
        {
          todos: data
        }
      )
      .then(response => {
        console.log("success", response);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  useEffect(() => {
    getJson();
  }, []);

  return (
    <div className="App">
      <h1>
        {/* TODO: うーんな書き方. いい書き方教えてください！ */}
        {/* {loading && "Todo List (loading...)"}
        {updating && "Todo List (updating...)"}
        {!loading && !updating && "Todo List"} */}
        {loading
          ? "Todo List (loading...)"
          : updating
          ? "Todo List (updating...)"
          : "Todo List"}
      </h1>

      <div className="todo-wrapper">
        <ul class="todo-list">
          {todoList.map((v, i) => {
            return (
              <li key={i} class="todo-item">
                <div class="todo-container">
                  <p>{v}</p>
                  <button onClick={() => deleteTodo(v)}>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="todo-action">
          <input value={todoValue} onChange={handleTodoValue} />
          <button onClick={addTodo}>追加</button>
        </div>

        <button onClick={initializeTodoList}>データ全削除</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
