import { useState } from "react";
import "./App.css";
import Quiz from "./components/card/quiz";

function App() {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  // Get the users preferred difficulty
  const getDifficulty = (e) => {
    console.log(e.target.value);
    setDifficulty(e.target.value);
  };

  // Get the users preferred category
  const getCategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  // Define the URL
  let URL = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;
  return (
    <div className="App">
      <h1>
        Welcome to the React Quiz by{"\u00A0"}
        <a href="https://portfolio-marnin-a.vercel.app/">Marnin_a</a>
      </h1>
      <div className="card">
        <h3 className="app-h3">What name would you like to use?</h3>
        {/* Get user's name to be used later on */}
        <input
          className="name-input"
          type="text"
          value={username}
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        ></input>

        {/* Create a div for the user to select their preferred difficulty and question category */}
        <div className="difficulties-categories">
          <div className="difficulties">
            <h3 value="" className="app-h3">
              Choose difficulty
            </h3>
            <button
              value="easy"
              className="difficulty-btn"
              onClick={getDifficulty}
            >
              Easy
            </button>
            <button
              value="medium"
              className="difficulty-btn"
              onClick={getDifficulty}
            >
              Meduim
            </button>
            <button
              value="hard"
              className="difficulty-btn"
              onClick={getDifficulty}
            >
              Hard
            </button>
          </div>
          <div className="categories">
            <h3 className="app-h3">Choose category</h3>
            <select
              name=""
              id="categories"
              value={category}
              onChange={getCategory}
            >
              <option value="questions" key="0">
                Type of question
              </option>
              <option value="9">General Knowledge</option>

              <option value="17">Science and Nature</option>

              <option value="22">Geography</option>

              <option value="20">Mythology</option>

              <option value="18">Science and Computers</option>
            </select>
          </div>
        </div>
        <button
          id="start-quiz"
          onClick={() => {
            console.log(username);
          }}
        >
          Start Quiz
        </button>

        {/* <Quiz username={username} /> */}
      </div>
    </div>
  );
}

export default App;
