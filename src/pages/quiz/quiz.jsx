import LoadingAnimation from "../../assets/quiz_loading.gif";
import Button from "../../components/button/button";
import React, { useState, useEffect } from "react";
import styles from "./quiz.module.css";
import axios from "axios";

export const Quiz = () => {
  const [TriviaData, setTriviaData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [AllPossibleAnswers, setAllPossibleAnswers] = useState([]);

  // Retrieve the required data
  let incorrectAnswers,
    correctAnswer,
    allAnswers = [];

  // Get data using axios
  const getData = () => {
    setLoading(false);
    let URL = JSON.parse(localStorage.getItem("url"));
    axios
      .get(URL)
      .then((res) => {
        const Data = res.data.results[0];
        incorrectAnswers = Data.incorrect_answers;
        correctAnswer = Data.correct_answer;
        // Combine all the answers into one array
        setTriviaData(Data);
        combineAllAnswers(incorrectAnswers, correctAnswer);
        // console.log(Data);
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

  //
  useEffect(() => {
    getData();
  }, []);
  console.log(AllPossibleAnswers);
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
  return (
    <div className={styles.quiz}>
      {/* <div>{counter}/5</div> */}
      <h3 className={styles.question}>{TriviaData.question}</h3>
      <div className={styles.options}>
        {AllPossibleAnswers.map((answer) => {
          return <Button answer={answer} />;
        })}
      </div>
    </div>
  );
};
