import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../../assets/quiz_loading.gif";
import Congratulations from "../congratulations/congratulations";
import "./quiz.css";

const quiz = () => {
  const [TriviaData, setTriviaData] = useState([]);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");

  // Set correct answer counter state
  const [counter, setCounter] = useState(1);

  //combines correct and incorrect answer into single array
  async function combineAllAnswers(incorrectAnswers, correctAnswer) {
    let allAnswers = [];

    incorrectAnswers.map((incorrectAnswer) => {
      allAnswers.push(incorrectAnswer);
    });

    allAnswers.push(correctAnswer);

    //Randomize order of answers in array
    allAnswers.sort(() => Math.random() - 0.5);
    setAllPossibleAnswers(allAnswers);
  }

  let url;
  // Get the URL and Username
  useEffect(() => {
    const URL = JSON.parse(localStorage.getItem("url"));
    url = URL;
  }, []);

  let incorrectAnswers;
  let correctAnswer;
  // Get question and answer data
  const NextQuestion = () => {
    axios
      .get(url)
      .then((res) => {
        const TriviaData = res.data.results[0];
        const answer = TriviaData.correct_answer;
        const wrong_answers = TriviaData.incorrect_answers;
        incorrectAnswers = wrong_answers;
        correctAnswer = answer;
        setLoading(false);
        setAnswer(answer);
        setTriviaData(TriviaData);
        combineAllAnswers(incorrectAnswers, correctAnswer);
      })
      .catch(() => {
        console.log("There was an error");
      });
  };

  useEffect(() => {
    NextQuestion();
  }, []);

  // Set loading animation
  if (Loading) {
    return (
      <div className="LoadingAnimation">
        <img src={LoadingAnimation} alt="Loading" />
      </div>
    );
  }

  // Define a function to convert special html characters, to normal characters
  function removeCharacters(question) {
    return question
      .replace(/(&quot\;)/g, '"')
      .replace(/(&rsquo\;)/g, '"')
      .replace(/(&#039\;)/g, "'")
      .replace(/(&amp\;)/g, '"');
  }

  let SelectedAnswer;
  function verifyAnswer(selectedAnswer) {
    //Checks if the selected answer equals the correct answer
    if (selectedAnswer == answer) {
      NextQuestion();
      setCounter((count) => count + 1);
      console.log("Correct");
    } else {
      console.log("Wrong");
      console.log(answer);
    }
  }

  // Define an if statement to check
  // if the number of correct answers is more than 5
  if (counter > 1) {
    return (
      <div>
        <Congratulations />
      </div>
    );
  }
  // Render Quiz
  return (
    <div id="body">
      <div className="quiz">
        <div className="quiz-content">
          <div>{counter}/5</div>
          <h3>{removeCharacters(TriviaData.question)}</h3>
          <div className="options">
            <div>
              {
                <button
                  className="option"
                  onClick={() => {
                    SelectedAnswer = allPossibleAnswers[0];
                    verifyAnswer(SelectedAnswer);
                  }}
                >
                  {removeCharacters(allPossibleAnswers[0])}
                </button>
              }
            </div>
            <div>
              {
                <button
                  className="option"
                  onClick={() => {
                    verifyAnswer(allPossibleAnswers[1]);
                  }}
                >
                  {removeCharacters(allPossibleAnswers[1])}
                </button>
              }
            </div>
            <div>
              {
                <button
                  className="option"
                  onClick={() => {
                    verifyAnswer(allPossibleAnswers[2]);
                  }}
                >
                  {removeCharacters(allPossibleAnswers[2])}
                </button>
              }
            </div>
            <div>
              {
                <button
                  className="option"
                  onClick={() => {
                    verifyAnswer(allPossibleAnswers[3]);
                  }}
                >
                  {removeCharacters(allPossibleAnswers[3])}
                </button>
              }
            </div>
          </div>
        </div>
        <div className="btns">
          <button id="skip" onClick={NextQuestion}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default quiz;
