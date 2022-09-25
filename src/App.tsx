import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllTasks, postTasks } from "./services/TodoService";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

const TasksFunction = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const active = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  const [newTaskName, setNewTaskName] = useState("");
  const [getTasks, setGetTasks] = useState(true);

  const newTask = (title: string) => {
    const newTasks = [...tasks, { id: tasks.length, title, done: false }];
    setTasks(newTasks);
    postTasks(newTasks);
    setNewTaskName("");
  };
  const doneTask = (id: number) => {
    const newTasks = tasks.map((t) => (t.id === id ? { ...t, done: true } : t));
    setTasks(newTasks);
    postTasks(newTasks);
  };
  const clear = () => {
    setTasks([]);
    postTasks([]);
  };

  useEffect(() => {
    if (getTasks) {
      getAllTasks().then((tasks) => setTasks(tasks));
      setGetTasks(false);
    }
  }, [getTasks]);

  return (
    <div>
      <input
        type="text"
        value={newTaskName}
        onChange={(v) => setNewTaskName(v.target.value)}
      />
      <button onClick={() => newTask(newTaskName)}>Add Task</button>
      <h1>Active tasks</h1>
      {active.map((t) => (
        <div
          style={{ fontWeight: "bold" }}
          onClick={() => {
            doneTask(t.id);
          }}
        >
          {t.title}
        </div>
      ))}
      <h1>Done tasks:</h1>
      {completed.map((task) => (
        <div style={{ textDecoration: "line-through" }}>{task.title}</div>
      ))}
      <div className="Total">Total tasks: {tasks.length}</div>
      <button onClick={clear}>Clear</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TasksFunction />
    </div>
  );
}

export default App;
