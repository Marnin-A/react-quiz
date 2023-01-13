import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "./home.module.css";

export const Home = () => {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const setName = () => {
    // This puts the name into local storage
    localStorage.setItem("name", JSON.stringify(username));
  };

  const getDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const getCategory = (e) => {
    setCategory(e.target.value);
  };

  // Define your API URL
  let URL = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;
  // Create a function to set the URL
  const setURL = () => {
    localStorage.setItem("url", JSON.stringify(URL));
  };

  // Add onclick navigation
  const navigate = useNavigate();
  const navigateToQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className={styles.home}>
      {/* Create input field for name */}
      <div className={styles.name}>
        <h3>What name would you like to use?</h3>
        <input
          id={styles.name__input}
          type="text"
          value={username}
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>

      {/* Create 2 columns one to choose difficulty */}
      {/* the other for categories */}
      <div className={styles.difficulties__categories}>
        {/* Difficulties column */}
        <div className={styles.difficulties}>
          <h3>Choose Difficulty</h3>
          <button
            className={styles.difficulties__btn}
            value="easy"
            onClick={getDifficulty}
          >
            Easy
          </button>
          <button
            className={styles.difficulties__btn}
            value="medium"
            onClick={getDifficulty}
          >
            Meduim
          </button>
          <button
            className={styles.difficulties__btn}
            value="hard"
            onClick={getDifficulty}
          >
            Hard
          </button>
        </div>
        <div className={styles.categories}>
          {/* Categories column */}
          <h3>Choose Category</h3>
          <select
            className={styles.categories__list}
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
      {/* Quiz start button */}
      <button
        className={styles.start}
        onClick={() => {
          setName();
          setURL();
          navigateToQuiz();
        }}
      >
        Start Quiz
      </button>
    </div>
  );
};
