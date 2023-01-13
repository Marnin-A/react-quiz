import React from "react";
import styles from "./button.module.css";

const button = (props) => {
  return <button className={styles.btn}>{props.answer}</button>;
};

export default button;
