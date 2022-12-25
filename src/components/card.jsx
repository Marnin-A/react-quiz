import React, { useState, useEffect } from "react";
import axios from "axios";
import "./card.css";

const card = () => {
  const [TriviaData, setTriviaData] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswers, setinCorrectAnswers] = useState([]);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);

  // Get question and answer data
  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple"
      )
      .then((res) => {
        const TriviaData = res.data.results[0];
        setTriviaData(TriviaData);
        const answer = TriviaData.correct_answer;
        const wrong_answers = TriviaData.incorrect_answers;
        setinCorrectAnswers(wrong_answers);
        setCorrectAnswer(answer);
        console.log(incorrectAnswers);
      })
      .catch(() => {
        console.log("There was an error");
      });
  }, []);

  // Use function to generate random numbers
  const arr = [];
  function myRandomInts(quantity, max) {
    while (arr.length < quantity) {
      var candidateInt = Math.floor(Math.random() * max) + 1;
      if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
    }
    return arr;
  }

  // Call random numbers function and assign random indexes
  // to each option
  myRandomInts(4, 4);
  let index1 = arr[0],
    index2 = arr[1],
    index3 = arr[2],
    index4 = arr[3];

  //combines correct and incorrect answer into single array
  async function combineAllAnswers(incorrectAnswers, correctAnswer) {
    let allAnswers = [];
    incorrectAnswers.map((item) => {
      item.incorrect_answers.map((incorrectAnswer) => {
        allAnswers.push(incorrectAnswer);
      });
    });
    allAnswers.push(correctAnswer);
    //Randomize order of answers in array
    allAnswers.sort(() => Math.random() - 0.5);
    setAllPossibleAnswers(allAnswers);
  }
  // Render Card
  return (
    <div className="card">
      <div className="card-content">
        <h3>{TriviaData.question}</h3>
        <div>
          <input type="checkbox" name="" id="" />
          <span>{index1}</span>
        </div>
        <div>
          <input type="checkbox" name="" id="" />
          {index2}
        </div>
        <div>
          <input type="checkbox" name="" id="" />
          {index3}
        </div>
        <div>
          <input type="checkbox" name="" id="" />
          {index4}
        </div>
      </div>
      <button id="submit" type="submit"></button>
    </div>
  );
};

export default card;
