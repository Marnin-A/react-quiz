import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../assets/quiz_loading.gif";
import "./card.css";

const card = () => {
  const [TriviaData, setTriviaData] = useState([]);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");

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

  let incorrectAnswers;
  let correctAnswer;
  // Get question and answer data
  const NextQuestion = () => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple"
      )
      .then((res) => {
        setLoading(false);
        const TriviaData = res.data.results[0];
        setTriviaData(TriviaData);
        const answer = TriviaData.correct_answer;
        const wrong_answers = TriviaData.incorrect_answers;
        incorrectAnswers = wrong_answers;
        correctAnswer = answer;
        setAnswer(answer);
        combineAllAnswers(incorrectAnswers, correctAnswer);
      })
      .catch(() => {
        console.log("There was an error");
      });
  };

  useEffect(() => {
    NextQuestion();
  }, []);

  if (Loading) {
    return (
      <div className="LoadingAnimation">
        <img src={LoadingAnimation} alt="Loading" />
      </div>
    );
  }
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
      console.log("Correct");
    } else {
      console.log("Wrong");
      console.log(answer);
    }
  }
  // Render Card
  return (
    <div className="card">
      <div className="card-content">
        <h3>{removeCharacters(TriviaData.question)}</h3>
        <div>
          {
            <button
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
              onClick={() => {
                verifyAnswer(allPossibleAnswers[1]);
                console.log(correctAnswer);
              }}
            >
              {removeCharacters(allPossibleAnswers[1])}
            </button>
          }
        </div>
        <div>
          {
            <button
              onClick={() => {
                verifyAnswer(allPossibleAnswers[2]);
                console.log(correctAnswer);
              }}
            >
              {removeCharacters(allPossibleAnswers[2])}
            </button>
          }
        </div>
        <div>
          {
            <button
              onClick={() => {
                verifyAnswer(allPossibleAnswers[3]);
                console.log(correctAnswer);
              }}
            >
              {removeCharacters(allPossibleAnswers[3])}
            </button>
          }
        </div>
      </div>
      <div className="btns">
        <button id="submit" type="submit">
          Submit
        </button>
        <button id="next" onClick={NextQuestion}>
          Next
        </button>
      </div>
    </div>
  );
};

export default card;
