import { useState } from "react";
import "./App.css";
import Quiz from "./components/card/quiz";

function App() {
  const [username, setUsername] = useState("Not Marnin");
  return (
    <div className="App">
      <h1>
        Welcome to the React Quiz by{"\u00A0"}
        <a href="https://portfolio-marnin-a.vercel.app/">Marnin_a</a>
      </h1>
      <div className="card">
        <h3 className="app-h3">What name would you like to use?</h3>
        <input className="name-input" type="text" />
        <div className="difficulties-categories">
          <div className="difficulties">
            <h3 className="app-h3">Choose difficulty</h3>
            <button className="difficulty-btn">Easy</button>
            <button className="difficulty-btn">Meduim</button>
            <button className="difficulty-btn">Hard</button>
          </div>
          <div className="categories">
            <h3 className="app-h3">Choose category</h3>
            <div>
              <input type="checkbox" name="general-knowledge" id="" />
              <label for="">General Knowledge</label>
            </div>
            <div>
              <input type="checkbox" name="science-and-nature" id="" />
              <label for="">Science and Nature</label>
            </div>
            <div>
              <input type="checkbox" name="geography" id="" />
              <label for="">Geography</label>
            </div>
            <div>
              <input type="checkbox" name="mythology" id="" />
              <label for="">Mythology</label>
            </div>
            <div>
              <input type="checkbox" name="science-and-computers" id="" />
              <label for="">Science and Computers</label>
            </div>
          </div>
        </div>
        <button id="start-quiz">Start Quiz</button>

        {/* <Quiz /> */}
      </div>
    </div>
  );
}

export default App;

// Features
// 1. Converts html code to regular characters.
// 2.
