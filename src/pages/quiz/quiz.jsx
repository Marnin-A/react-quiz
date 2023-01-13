import LoadingAnimation from "../../assets/quiz_loading.gif";
import React, { useState, useEffect } from "react";
import styles from "./quiz.module.css";
import axios from "axios";

export const Quiz = () => {
  const [TriviaData, setTriviaData] = useState([]);
  const [Loading, setLoading] = useState(true);

  // Retrieve the required data
  let incorrectAnswers, correctAnser;
  const getData = () => {
    setLoading(false);
    let URL = JSON.parse(localStorage.getItem("url"));
    axios
      .get(URL)
      .then((res) => {
        const Data = res.data.results[0];
        incorrectAnswers = Data.incorrect_answers;
        correctAnser = Data.correct_answer;
        setTriviaData(Data);
        // console.log(incorrectAnswers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  return (
    <div className={styles.quiz}>
      {/* <div>{counter}/5</div> */}
      <h3 className={styles.question}>{TriviaData.question}</h3>
    </div>
  );
};
