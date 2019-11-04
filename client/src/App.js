import React from "react";
import axios from "axios";

import "./App.css";

function App() {
  // const [data, setData] = React.useState([]);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios("/tasks");
  //     setData(result.data);
  //   };
  //   fetchData();
  // }, []);

  // console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
