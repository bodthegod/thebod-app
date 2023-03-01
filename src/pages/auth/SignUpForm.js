import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/LogInSignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { Col, Row, Container, Form, Button } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <Col className={styles.Col}>
        <Container>
          <h1 className={styles.Header}>Sign Up</h1>
          <Form>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="username"
                name="username"
              />
            </Form.Group>

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="password"
                name="password1"
              />
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="confirm password"
                name="password2"
              />
            </Form.Group>
            <Button className={btnStyles.Button} type="submit">
              Submit
            </Button>
          </Form>
        </Container>
        <Container className="mb-5">
          <Link className={styles.Link} to="/login">
            Have an account? Click here to log in.
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
