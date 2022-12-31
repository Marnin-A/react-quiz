import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../../assets/quiz_loading.gif";
import Congratulations from "../congratulations/congratulations";
import "./quiz.css";

const quiz = () => {
  const [TriviaData, setTriviaData] = useState([]);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [iscorrect, setIsCorrect] = useState(false);
  const [borderColour, setBorderColour] = useState("2px solid #8d44ad");
  const [answer, setAnswer] = useState("");

  // Set correct answer counter state
  const [counter, setCounter] = useState(1);

  // Function to change to indexes of the answers
  const Randomize = (answers) => {
    answers.sort(() => Math.random() - 0.5);
  };
  //combines correct and incorrect answer into single array
  async function combineAllAnswers(incorrectAnswers, correctAnswer) {
    let allAnswers = [];

    // Put all the answers into a single array
    incorrectAnswers.map((incorrectAnswer) => {
      allAnswers.push(incorrectAnswer);
    });
    allAnswers.push(correctAnswer);

    //Randomize order of answers in array
    Randomize(allAnswers);
    setAllPossibleAnswers(allAnswers);
  }

  // Get the URL and Username
  let url;
  useEffect(() => {
    const URL = JSON.parse(localStorage.getItem("url"));
    url = URL;
  }, []);

  // Get question and answer data
  let incorrectAnswers;
  let correctAnswer;
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
      .catch((error) => {
        console.log(error);
      });
  };

  const setBorder = () => {
    setBorderColour("2px solid #8d44ad");
  };
  useEffect(() => {
    NextQuestion();
  }, []);

  // Set loading animation
  if (Loading) {
    return (
      <div>
        <img
          className="LoadingAnimation"
          src={LoadingAnimation}
          alt="Loading"
        />
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
      setIsCorrect(true);
      setBorderColour("2px solid green");
      Randomize(allPossibleAnswers);
    } else {
      setIsCorrect(false);
      setBorderColour("2px solid red");
    }
  }

  // Define an if statement to check if the number
  // of correct answers is more than 5
  if (counter > 5) {
    return (
      <div>
        <Congratulations />
      </div>
    );
  }

  // Render Quiz
  return (
    <div id="body">
      <div
        className="quiz"
        style={{ border: iscorrect ? borderColour : borderColour }}
      >
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
                    setTimeout(setBorder, 500);
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
                    SelectedAnswer = allPossibleAnswers[1];
                    verifyAnswer(SelectedAnswer);
                    setTimeout(setBorder, 500);
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
                    SelectedAnswer = allPossibleAnswers[2];
                    verifyAnswer(SelectedAnswer);
                    setTimeout(setBorder, 500);
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
                    SelectedAnswer = allPossibleAnswers[3];
                    verifyAnswer(SelectedAnswer);
                    setTimeout(setBorder, 500);
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
