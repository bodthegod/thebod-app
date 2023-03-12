import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        width={height}
        height={height}
        src={src}
        alt="profile avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;