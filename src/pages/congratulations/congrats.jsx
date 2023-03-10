import React from "react";
import styles from "./congrats.module.css";
import { useNavigate } from "react-router-dom";

const congrats = () => {
  // Get the user's name from local storage
  let Name = JSON.parse(localStorage.getItem("name"));
  // Define a function to route you back to the homepage
  const navigate = useNavigate();
  const gotToHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.congrats}>
      <div className={styles.congrats__text}>
        Congratulations,{"\u00A0"}
        {Name}
        <div className={styles.confetti}>🎉</div>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={gotToHome}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default congrats;
