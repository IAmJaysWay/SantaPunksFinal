import "./App.css";
import bgImg from "./xmasBg.jpg";
import pwr from "./powered.png";
import logo from "./punkMas.png";
import Canvas from "./Canvas";
import { useEffect, useState } from "react";
import axios from "axios";
import hat from "./transparentHat.png";

function App() {
  const [punkId, setPunkId] = useState(1);
  const [punkDetails, setPunkDetails] = useState({});
  const [fetching, setFetching] = useState(false);

  function changeId(e) {
    setPunkId(e.target.value);
  }

  async function getPunk() {
    setFetching(true);
    const response = await axios.get(`http://localhost:3000/getPunk`, {
      params: { id: String(punkId) },
    });

    setPunkDetails(response.data);
    console.log(response.data);
    setTimeout(() => {
      setFetching(false);
    }, 2000);
  }

  useEffect(() => {
    getPunk();
  }, []);

  return (
    <div
      className="App"
      style={{ background: `url(${bgImg})`, backgroundSize: "cover" }}
    >
      <img src={pwr} alt="pwr" className="pwr" />
      <img src={logo} alt="logo" className="logo" />

      {fetching ? (
        <img src={hat} alt="hat" className="hat" />
      ) : (
        <Canvas punkDetails={punkDetails} />
      )}

      <input
        type="number"
        max={9999}
        min={1}
        value={punkId}
        onChange={(e) => changeId(e)}
      ></input>
      <div className="button" onClick={getPunk}>
        Get Santa
      </div>
    </div>
  );
}

export default App;
