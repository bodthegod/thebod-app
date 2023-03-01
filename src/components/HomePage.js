import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavLink from "react-router-dom/NavLink";
import { Jumbotron } from "react-bootstrap";
import styles from "../styles/HomePage.module.css";
import btnStyles from "../styles/Button.module.css"

const HomePage = () => {
  return (
    <div className="mt-">
      <Row className="text-center">
        <Col sm={12}>
          <Jumbotron>
            <h1 className="mb-3">Hello there, blogger!</h1>
            <p>
              This is <strong>thebod</strong>, a fitness blog where you can post
              and share your fitness desires and goals!
            </p>
            <br />
            <p>Want to share your fitness achievements?</p>
            <p>
              <NavLink to="/signup">
                <Button className={btnStyles.Button}>
                  Sign Up
                </Button>
              </NavLink>
              <NavLink to="/login">
                <Button className={btnStyles.Button}>Log into my existing account</Button>
              </NavLink>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
