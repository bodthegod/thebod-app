import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const authIcons = <>{currentUser?.username}</>
  const unAuthIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/login"
      >
        <i class="fa-solid fa-right-to-bracket"></i>
        <span>Log In</span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i class="fa-solid fa-person-circle-plus"></i>
        <span>Sign Up</span>
      </NavLink>
    </>
  );
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <span>
              <strong>thebod</strong>
            </span>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          className={styles.ToggleButton}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i class="fa-solid fa-house-chimney-window"></i>
              <span>Home</span>
            </NavLink>
            {currentUser ? authIcons : unAuthIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
