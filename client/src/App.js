import React from "react";
import { Switch, Route, Redirect, Link, useParams } from "react-router-dom";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get("/tasks.json");
        setData(result.data);
      } catch (e) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  function renderTasks(tasks) {
    return (
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <div className="pointer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task._id, !task.completed)}
              />
              <Link to={`/tasks/${task._id}`}>{task.description}</Link>
            </div>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }

  async function handleToggleTask(id, completed) {
    try {
      await axios.patch(`/tasks/${id}.json`, { completed });

      // Optimistically render changes
      setData(prevData => prevData.map(task => (task._id === id ? { ...task, completed } : task)));
    } catch (e) {
      //
    }
  }

  async function handleDeleteTask(id) {
    try {
      await axios.delete(`/tasks/${id}.json`);

      // Optimistically render changes
      setData(prevData => prevData.filter(task => task._id !== id));
    } catch (e) {
      //
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/tasks.json", {
        description: newTask,
      });
      setData(prevData => [...prevData, data]);
      setNewTask("");
    } catch (e) {
      setIsError(true);
    }
  }

  return (
    <div className="App">
      <section className="App-body">
        <h1>
          <Link to="/">Tasks</Link>
        </h1>
        <Switch>
          <Route path="/tasks/:id">
            <Task />
          </Route>
          <Redirect exact from="/" to="/tasks" />
          <Route path="/tasks">
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong...</p>}
            {data.length > 0 && renderTasks(data)}
            <form onSubmit={handleAddTask}>
              <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} />
            </form>
          </Route>
        </Switch>
      </section>
    </div>
  );
}

function Task() {
  let { id } = useParams();
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/tasks/${id}.json`);
        setData(result.data);
      } catch (e) {
        //
      }
    };
    fetchData();
  }, [id]);

  if (data.description) {
    return <div>{data.description}</div>;
  }
  return null;
}

export default App;
