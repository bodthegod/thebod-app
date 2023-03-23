import React from "react";
import Link from "react-router-dom/Link";
import { useLocation } from "react-router-dom";

import styles from "../styles/Toolbar.module.css";
import appStyles from "../App.module.css";
import { MdOutlineLibraryAdd, MdOutlineSportsHandball } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";

import Container from "react-bootstrap/Container";
import ScrollToTopButton from "./ScrollToTopButton";

const Toolbar = () => {
  const { pathname } = useLocation();
  return (
    <Container className={`${appStyles.Content} ${styles.ActivePath} mb-2`}>
      <Link to="/feed" className={pathname === "/feed" ? styles.active : null}>
        <p>
          <i className={`${styles.Icon} ${styles.MyFeedIcon} m-3`}>
            <MdOutlineSportsHandball />
          </i>
          <strong>My Feed</strong>
        </p>
      </Link>
      <Link
        to="/liked"
        className={pathname === "/liked" ? styles.active : null}
      >
        <p>
          <i
            className={`${styles.Icon} ${styles.HeartIcon} ${styles.ActivePath} m-3`}
          >
            <RiHeartsFill />
          </i>
          <strong>My Hearts </strong>
        </p>
      </Link>
      <Link
        to="/posts/create"
        className={pathname === "/posts/create" ? styles.active : null}
      >
        <p>
          <i
            className={`${styles.Icon} ${styles.CreatePostIcon} ${styles.ActivePath} m-3`}
          >
            <MdOutlineLibraryAdd />
          </i>
          <strong>Create Post</strong>
        </p>
      </Link>
      <ScrollToTopButton />
    </Container>
  );
};

export default Toolbar;
