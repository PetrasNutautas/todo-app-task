import React, { useState } from "react";
import "./App.css";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface Props {
  initialTasks: Task[];
}

const someTasks: Task[] = [
  { id: 0, title: "Wash dishes", done: false },
  { id: 1, title: "Read book", done: false },
  { id: 2, title: "Get some sleep", done: true },
];

const TasksFunction = ({ initialTasks }: Props) => {
  const [tasks, setTasks] = useState(initialTasks);

  const [newTaskName, setNewTaskName] = useState("");
  const newTask = (title: string) =>
    setTasks([...tasks, { id: tasks.length, title, done: false }]);
  const doneTask = (id: number) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: true } : t)));

  return (
    <div>
      <input
        type="text"
        value={newTaskName}
        onChange={(v) => setNewTaskName(v.target.value)}
      />
      <button
        onClick={() => {
          newTask(newTaskName);
          setNewTaskName("");
        }}
      >
        Add Task
      </button>
      <h1>Active tasks</h1>
      {tasks
        .filter((t: Task) => !t.done)
        .map((t: Task) => (
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
      {tasks
        .filter((t: Task) => t.done)
        .map((task: Task) => (
          <div style={{ textDecoration: "line-through" }}>{task.title}</div>
        ))}
      <div className="Total">Total tasks: {tasks.length}</div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TasksFunction initialTasks={someTasks} />
    </div>
  );
}

export default App;
