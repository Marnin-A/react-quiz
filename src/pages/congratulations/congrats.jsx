import React from "react";
import styles from "./congrats.module.css";

const congrats = () => {
  let Name = JSON.parse(localStorage.getItem("name"));
  return (
    <div className={styles.congrats}>
      Congratulations,{"\u00A0"}
      {Name}🎉
    </div>
  );
};

export default congrats;
