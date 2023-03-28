import React from "react";
import { useState } from "react";
import css from "classnames";
import styles from "../styles/UserFeedbackCue.module.css";

export default function UserFeedbackCue({ variant, message }) {
  const [isShown, setIsShown] = useState(true);

  /*
    Handles closing of the alert message
  */
  const handleClose = (e) => {
    e.preventDefault();
    setIsShown(false);
  };

  return (
    <div
      className={css(styles.Alert, styles[variant], !isShown && styles.Hidden)}
    >
      <span className={styles.Close} onClick={handleClose}>
        &times;
      </span>
      {message}
    </div>
  );
}
