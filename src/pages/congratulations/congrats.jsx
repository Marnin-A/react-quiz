import React from "react";
import styles from "./congrats.module.css";

const congrats = () => {
  // Get the user's name from local storage
  let Name = JSON.parse(localStorage.getItem("name"));
  // Define a function to refresh the page
  function refreshPage() {
    window.location.reload(true);
  }
  return (
    <div className={styles.congrats}>
      <div className={styles.congrats__text}>
        Congratulations,{"\u00A0"}
        {Name}🎉
      </div>
      <div className={styles.btns}>
        <button className={styles.btn}>Home</button>
        <button className={styles.btn} onClick={refreshPage}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default congrats;
