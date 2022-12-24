import { useState } from "react";
import "./App.css";
import Card from "./components/card";

function App() {
  return (
    <div className="App">
      <h1>
        Welcome to the React Quiz by{"\u00A0"}
        <a href="https://portfolio-marnin-a.vercel.app/">Marnin_a</a>
      </h1>
      <Card />
    </div>
  );
}

export default App;
