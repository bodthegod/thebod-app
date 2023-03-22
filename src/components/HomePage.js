import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavLink from "react-router-dom/NavLink";
import { Container, Jumbotron } from "react-bootstrap";
import styles from "../styles/HomePage.module.css";
import appStyles from "../App.module.css";
import btnStyles from "../styles/Button.module.css";
import { CSSTransition } from "react-transition-group";
const HomePage = () => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
      <Container fluid>
        <Jumbotron className={`${appStyles.Content} p-5`} fluid>
          <Container>
            <h1 className={styles.HomeTitle}>Welcome to thebod blog</h1>
            <p className={`${styles.HomeDescription} lead`}>
              Join our community of fitness enthusiasts and achieve your goals.
            </p>
            <p>
              <NavLink to="/signup">
                <Button className={`${styles.HomeButton} text-center`}>
                  Sign Up
                </Button>
              </NavLink>
              <NavLink to="/login">
                <Button className={`${styles.HomeButton} text-center`}>
                  Log into my existing account
                </Button>
              </NavLink>
            </p>
          </Container>
        </Jumbotron>

        <Container className="my-5">
          <Row className="g-4">
            <Col
              md={6}
              lg={4}
              className={`${appStyles.Content} ${styles.HomePromptOne} ${styles.HomePrompt}`}
            >
              <div className="p-4 ">
                <h2 className="text-center">Inspiration</h2>
                <p className="mt-4">
                  Get inspired by others' journeys and share your own to inspire
                  others.
                </p>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className={`${appStyles.Content} ${styles.HomePrompt}`}>
                <h2 className="text-center">Connect with Others</h2>
                <p className="m-3 mt-4">
                  Connect with like-minded individuals and share your fitness
                  journey.
                </p>
              </div>
            </Col>
            <Col
              md={6}
              lg={4}
              className={`${appStyles.Content} ${styles.HomePromptThree} ${styles.HomePrompt}`}
            >
              <div className="p-4">
                <h2 className="text-center">Accountability</h2>
                <p className="mt-4">
                  Stay accountable to yourself and others by regularly sharing
                  your progress and updates.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <footer className={styles.footer}>
          <div className="text-center">
            <p className={`${styles.ContactIcons} text-white`}>
              Created by Joe Playdon
            </p>
          </div>

          <div className="text-center pb-3">
            <a
              href="https://github.com/bodthegod"
              aria-label="View my repositories!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`${styles.ContactIcons} ${styles.GithubIcon}  fab fa-github `}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/joe-playdon-882a58231/ "
              aria-label="Check out my LinkedIn!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`${styles.ContactIcons} ${styles.LinkedinIcon}  fab fa-linkedin `}
              />
            </a>
          </div>
        </footer>
      </Container>
    </CSSTransition>
  );
};

export default HomePage;
