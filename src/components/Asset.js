import React from "react";
import styles from "../styles/Asset.module.css";
import HashLoader from "react-spinners/HashLoader";

/*
Asset component that takes different props
and changes asset displayed if specified
prop is passed
*/
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <HashLoader color="#9d4edd" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Asset;
