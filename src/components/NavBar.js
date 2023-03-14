import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import { TbMessagePlus } from "react-icons/tb";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {}
  };

  const createPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
    </NavLink>
  );

  // authIcons variable to display icons if a user is
  // authenticated / logged in
  const authIcons = (
    <>
      <NavDropdown
        title={
          <div>
            <Avatar src={currentUser?.profile_image} height={40} />
            <span>{currentUser?.username}</span>
          </div>
        }
        id="nav-dropdown"
      >
        <NavDropdown.Item className={styles.DropdownMenu}>
          <NavLink to={`/profiles/${currentUser?.profile_id}`}>
            My Profile
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item className={styles.DropdownMenu}>
          <NavLink to="/" onClick={handleLogOut}>
            Log out
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
  // unAuthIcons variable to display icons if a user is
  // unauthenticated / logged out
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
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <span>
              <strong>thebod</strong>
            </span>
          </Navbar.Brand>
        </NavLink>
        {currentUser && createPostIcon}
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          ref={ref}
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
