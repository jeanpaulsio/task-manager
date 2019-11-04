import React from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/tasks");
      setData(result.data);
    };
    fetchData();
  }, []);

  function renderTasks(tasks) {
    return (
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <div>
              <input type="checkbox" />
              {task.description}
            </div>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    );
  }

  async function handleAddTask(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/tasks", {
        description: newTask,
      });
      setData(prevData => [...prevData, data]);
      setNewTask("");
    } catch (e) {
      //
    }
  }

  return (
    <div className="App">
      <section className="App-body">
        <h1>Tasks</h1>
        {data.lenth === 0 ? <p>No Tasks</p> : renderTasks(data)}
        <form onSubmit={handleAddTask}>
          <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} />
        </form>
      </section>
    </div>
  );
}

export default App;
