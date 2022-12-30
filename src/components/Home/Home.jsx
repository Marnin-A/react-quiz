import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

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

  // Create a function to navigate to the quiz component
  const navigate = useNavigate();

  const navigateToQuiz = () => {
    // Navigate to /quiz
    navigate("/quiz");
  };
  // Define the URL
  let URL = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;

  // Create a function to set the URL
  const setURL = () => {
    localStorage.setItem("url", JSON.stringify(URL));
  };

  // Create a function to get the URL
  const setName = () => {
    localStorage.setItem("name", JSON.stringify(username));
  };

  // Render Home component
  return (
    <div>
      <div className="Home">
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
          {/* Setup routing to get to quiz page */}

          <button
            id="start-quiz"
            onClick={() => {
              setURL();
              setName();
              navigateToQuiz();
            }}
          >
            Start Quiz
          </button>
        </div>
      </div>
      {/* <Quiz username={username} /> */}
    </div>
  );
}

export default App;
