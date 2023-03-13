import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Upload from "../../assets/upload-img.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/LogInSignUpForm.module.css";
import buttonStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/PostCreateEditForm.module.css";
import assetStyles from "../../styles/Asset.module.css";
import { CSSTransition } from "react-transition-group";

function PostCreateForm() {
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Enter Your Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          className={`${formStyles.Form} ${inputStyles.Input}`}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Choose your tag!</Form.Label>
        <Form.Control as="select" className={`${formStyles.Form}`}>
          <option value="bodybuilding">BodyBuilding</option>
          <option value="running">Running</option>
          <option value="sports">Sports</option>
          <option value="fitness">Fitness</option>
          <option value="wellbeing">Wellbeing</option>
          <option value="strength training">Strength Training</option>
          <option value="hypertrophy">Hypertrophy</option>
          <option value="crossfit">CrossFit</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Describe your post!</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="content"
          className={`${formStyles.Form} ${inputStyles.Input}`}
        />
      </Form.Group>

      <Button className={buttonStyles.Button} type="submit">
        Create
      </Button>

      <Button className={`${buttonStyles.Button} mx-3`} onClick={() => {}}>
        Cancel
      </Button>
    </div>
  );

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
      <Form>
        <Row>
          <Col md={7} lg={8} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
          <Col className="py-2 p-0 p-md-2" md={5} lg={4}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group className="text-center">
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <img
                    src={Upload}
                    alt="Upload"
                    message="Upload your photo here!"
                    className={assetStyles.Asset}
                  />
                </Form.Label>
              </Form.Group>

              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
        </Row>
      </Form>
    </CSSTransition>
  );
}

export default PostCreateForm;
