import React from "react";
import { NavLink } from "react-router-dom";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import { useCookies } from "react-cookie";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import styles from "../styles/NavBar.module.css";
import Avatar from "./Avatar";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [, , removeCookie] = useCookies(["refreshTokenTimestamp"]);
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  /*
    Handles user logout
    Removes currently logged in user
    Removes authentication token stored in cookies
    Redirects to the home page
  */
  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      removeCookie("refreshTokenTimestamp");
      removeCookie("profile_id");
      setExpanded(false);
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      return err;
    }
  };

  /*
    Icon for "create post"
    links to posts/create url
  */
  const createPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    ></NavLink>
  );

  /*
    authIcons variable to display icons if a user is
    authenticated / logged in, displays username and 
    profile picture of current user in navbar with
    dropdown menu to logout or view my profile
  */
  const authIcons = (
    <>
      <NavDropdown
        title={
          <div className="expanded">
            <Avatar src={currentUser?.profile_image} height={40} />
            <span className="expanded">{currentUser?.username}</span>
          </div>
        }
        id="nav-dropdown"
      >
        <NavDropdown.Item className={styles.DropdownMenu}>
          <NavLink to={`/profiles/${currentUser?.profile_id}`}>
            <AiOutlineUser
              className={`${styles.NavbarExpandedIcons} ${styles.ProfileIcon}`}
              size={25}
            />
            My Profile
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item className={styles.DropdownMenu}>
          <NavLink className={styles.LogoutIcon} to="/" onClick={handleLogOut}>
            <AiOutlineLogout
              className={`${styles.NavbarExpandedIcons} ${styles.LogoutIcon}`}
              size={25}
            />
            Log out
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  /*
    unAuthIcons variable to display icons if a user is
    unauthenticated / logged out, icons display in navbar
    component, shows login or signup links
  */
  const unAuthIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/login"
      >
        <i className="fa-solid fa-right-to-bracket"></i>
        <span>Log In</span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-person-circle-plus"></i>
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
        <NavLink to="/" aria-label="thebod home navbar title">
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
              className={`${styles.NavLink} ${styles.Home}`}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-solid fa-house-chimney-window"></i>
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
