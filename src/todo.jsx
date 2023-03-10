import React, { useState, useEffect, useCallback } from 'react';

export default function Todo() {
  let [task, setTask] = useState('');
  let [myObject, setMyObject] = useState({});
  let [myArray, setMyArray] = useState([]);
  let [todos, setTodos] = useState([]);
  let [id, setId] = useState(1);
  let [complete, setComplete] = useState(false);

  let handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  let addTask = useCallback((event) => {
    event.preventDefault();
    setId(Math.floor(Math.random() * 10000));
    setMyArray([...myArray, { task, id, complete }]);
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(myArray));
  }, [myArray]);

  useEffect(() => {
    let storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, [myArray]);

  let deleteTask = (id) => {
    setMyArray(myArray.filter((item) => item.id !== id));
  };

  let toggleComplete = (id) => {
    setMyArray(myArray.map((item) => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    }));
  };

  return (
    <form id='main'>
      <nav>
        <h1>Write your To Do's</h1>
      </nav>
      <div id='input'>
        <span>
          <label htmlFor=''>Task:</label>
          <input id='task' type='text' value={task} onChange={handleTaskChange} />
        </span>
      </div>
      <div id='displayTasks'>
        <p>Uncompleted Tasks {JSON.stringify(myArray)}</p>
        <ul>
          {myArray.map((item) => (
            <li id='list' key={item.id}>
              <label>
                <input type='checkbox' checked={item.complete} onChange={() => toggleComplete(item.id)}/>
                <span>Task: {item.task}</span>
              </label>
              <br />
              <button id='delete' onClick={() => deleteTask(item.id)}>Delete</button>
              <button>Edit</button>
            </li>
          ))}
        </ul>
      </div>
      <footer>
        <button onClick={addTask}>AddTask</button>
      </footer>
    </form>
  );
}