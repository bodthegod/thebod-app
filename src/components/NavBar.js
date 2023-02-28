import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand><span><strong>thebod</strong></span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <i class="fa-solid fa-house-chimney-window"></i><span>Home</span>
            </Nav.Link>
            <Nav.Link>
              <i class="fa-solid fa-right-to-bracket"></i><span>Log In</span>
            </Nav.Link>
            <Nav.Link>
              <i class="fa-solid fa-person-circle-plus"></i><span>Sign Up</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
