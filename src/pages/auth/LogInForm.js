import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/LogInSignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { RiLockPasswordLine } from "react-icons/ri";
const LogInForm = () => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
      <Row className={styles.Row}>
        <Col className={styles.Col}>
          <Container>
            <h1 className={styles.Header}>
              Log In <RiLockPasswordLine />
            </h1>

            <Form>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="enter username"
                  name="username"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="d-none">Password </Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="enter password"
                  name="password"
                />
              </Form.Group>
              <Button className={` ${btnStyles.Button} ${styles.LogInSignUpButton}`} type="submit">
                Log In!
              </Button>
            </Form>
          </Container>
          <Container className="mb-5">
            <Link className={styles.Link} to="/signup">
              Don't have an account? Click here to sign up!
            </Link>
          </Container>
        </Col>
      </Row>
    </CSSTransition>
  );
};

export default LogInForm;
