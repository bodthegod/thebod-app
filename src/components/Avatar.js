import React from "react";
import styles from "../styles/Avatar.module.css";

/*
  Avatar component that has default height prop
*/
const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={`${styles.Avatar} expanded`}
        src={src}
        width={height}
        height={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
