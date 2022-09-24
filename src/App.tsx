import React, { useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

import "./styles.css";

const Active = styled.div`
  font-weight: bold;
`;

const Done = styled.div`
  text-decoration: line-through;
`;

const Total = styled.div`
  padding-top: 10px;
`;

interface Task {
  id: number;
  title: string;
  done: boolean;
}

const someTasks: Task[] = [
  { id: 0, title: "Wash dishes", done: false },
  { id: 1, title: "Read book", done: false },
  { id: 2, title: "Get some sleep", done: true },
];

const TasksFunction = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState(initialTasks);

  const [newTaskName, setNewTaskName] = useState("");
  const newTask = (title: string) =>
    setTasks([...tasks, { id: tasks.length, title, done: false }]);
  const doneTask = (id: number) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: true } : t)));

  return (
    <div>
      <form
        onSubmit={() => {
          newTask(newTaskName);
          setNewTaskName("");
        }}
      >
        <label>
          New Task:
          <input type="text" value={newTaskName} onChange={setNewTaskName} />
        </label>
        <input type="submit" value="Add Task" />
      </form>

      {tasks
        .filter((t: Task) => !t.done)
        .map((t: Task) => (
          <div
            className="Active"
            onClick={() => {
              doneTask(t.id);
            }}
          >
            {t.title}
          </div>
        ))}
      {tasks
        .filter((t: Task) => t.done)
        .map((task) => (
          <div className="Done">{task.title}</div>
        ))}
      <div className="Total">Total tasks: {tasks.length}</div>
    </div>
  );
};

// class Tasks extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       active: this.props.tasks.filter(task => !task.done),
//       completed: this.props.tasks.filter(task => task.done),
//       total: this.props.tasks.length
//     };

//     this.addTask = this.addTask.bind(this)
//   }

//   addTask() {
//     this.props.tasks.push({ title: 'new task', done: false });
//     this.state = {
//       active: this.props.tasks.filter(task => !task.done),
//       completed: this.props.tasks.filter(task => task.done),
//       total: this.props.tasks.length
//     };
//     this.forceUpdate();
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.addTask}>Add Task</button>
//         {this.state.active.map(task => <Active onClick={() => {
//           this.setState({ completed: this.state.completed.concat(task) })
//         }}>{task.title}</Active>)}
//         {this.state.completed.map(task => <Done>{task.title}</Done>)}
//         <Total>Total tasks: {this.state.total}</Total>
//       </div>
//     );
//   }
// }

export default function App() {
  return <TasksFunction {...someTasks} />;
}
