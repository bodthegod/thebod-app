import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import styles from "../styles/Toolbar.module.css";
import appStyles from "../App.module.css";
import { MdOutlineLibraryAdd, MdOutlineSportsHandball } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";

const Toolbar = () => {
  return (
    <Container className={`${appStyles.Content} mb-2`}>
      <Link to="/feed">
        <p>
          <i className={`${styles.Icon} ${styles.MyFeedIcon} m-3`}>
            <MdOutlineSportsHandball />
          </i>
          My Feed
        </p>
      </Link>
      <Link to="/liked">
        <p>
          <i className={`${styles.Icon} ${styles.HeartIcon} m-3`}>
            <RiHeartsFill />
          </i>
          My Hearts
        </p>
      </Link>
      <Link to="/posts/create">
        <p>
          <i className={`${styles.Icon} ${styles.CreatePostIcon} m-3`}>
            <MdOutlineLibraryAdd />
          </i>
          Create Post
        </p>
      </Link>
    </Container>
  );
};

export default Toolbar;
