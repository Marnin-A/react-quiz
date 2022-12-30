import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/quiz";

const App = () => {
  return (
    <div className="App">
      <nav>
        <h1>
          Welcome to the React Quiz by{"\u00A0"}
          <a href="https://portfolio-marnin-a.vercel.app/">Marnin_a</a>
        </h1>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
};

export default App;
