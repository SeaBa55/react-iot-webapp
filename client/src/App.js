import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(false);
  // const [ledSwitchState, setLedSwitchState] = useState();

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, [data]);

  
  const ledSwitch = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: !data })
    };
    fetch("/api", requestOptions)
        .then((res) => res.json())
        .then(data => {
          console.log(data)
        })
        .then(() => setData(!data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>LED {data===false ? "Off":"On"}</p>
        <button
          className="btn btn-info btn-block"
          type="button"
          id="ledOnSwitch"
          onClick={ledSwitch}
        >
          Switch {data===false ? "ON" : "OFF"}
        </button>
      </header>
    </div>
  );
}

export default App;
