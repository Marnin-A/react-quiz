import LoadingAnimation from "../../assets/quiz_loading.gif";
import Congrats from "../congratulations/congrats";
import React, { useState, useEffect } from "react";
import styles from "./quiz.module.css";
import axios from "axios";

export const Quiz = () => {
  const [TriviaData, setTriviaData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [AllPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [counter, setCounter] = useState(1);
  const [borderColour, setBorderColour] = useState("2px solid #8d44ad");
  const [iscorrect, setIsCorrect] = useState(false);

  // Retrieve the required data
  let incorrectAnswers,
    correctAnswer,
    allAnswers = [];

  // Get data using axios
  const getData = () => {
    let URL = JSON.parse(localStorage.getItem("url"));
    axios
      .get(URL)
      .then((res) => {
        setLoading(false);
        const Data = res.data.results[0];
        incorrectAnswers = Data.incorrect_answers;
        correctAnswer = Data.correct_answer;
        // Combine all the answers into one array
        setTriviaData(Data);
        combineAllAnswers(incorrectAnswers, correctAnswer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to change to indexes of the answers
  const Randomize = (answers) => {
    answers.sort(() => Math.random() - 0.5);
  };

  //combines correct and incorrect answer into single array
  async function combineAllAnswers(incorrectAnswers, correctAnswer) {
    // Put all the answers into a single array
    incorrectAnswers.map((incorrectAnswer) => {
      allAnswers.push(incorrectAnswer);
    });
    allAnswers.push(correctAnswer);

    //Randomize order of answers in array
    Randomize(allAnswers);
    setAllPossibleAnswers(allAnswers);
  }
  // Get the data onload
  useEffect(() => {
    getData();
  }, []);

  // Set loading animation
  if (Loading) {
    return (
      <div>
        <img
          className={styles.LoadingAnimation}
          src={LoadingAnimation}
          alt="Loading"
        />
      </div>
    );
  }
  // Define a function to convert special html characters, to normal characters
  // function removeCharacters(question) {
  //   return question
  //     .replace(/(&quot\;)/g, '"')
  //     .replace(/(&rsquo\;)/g, '"')
  //     .replace(/(&#039\;)/g, "'")
  //     .replace(/(&amp\;)/g, '"');
  // }
  const setBorder = () => {
    setBorderColour("2px solid #8d44ad");
  };
  let SelectedAnswer;
  const verifyAnswer = (option) => {
    if (TriviaData.correct_answer === option) {
      setCounter((count) => count + 1);
      getData();
      setBorderColour("2px solid green");
    } else {
      setIsCorrect(false);
      setBorderColour("2px solid red");
    }
  };

  if (counter > 5) {
    return <Congrats />;
  }
  return (
    <div
      className={styles.quiz}
      style={{ border: iscorrect ? borderColour : borderColour }}
    >
      <div>{counter}/5</div>
      <h3 className={styles.question}>{TriviaData.question}</h3>
      <div className={styles.options}>
        {AllPossibleAnswers.map((answer, id) => {
          return (
            <button
              className={styles.btn}
              key={id}
              onClick={() => {
                SelectedAnswer = answer;
                verifyAnswer(SelectedAnswer);
                setTimeout(setBorder, 500);
              }}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
};
