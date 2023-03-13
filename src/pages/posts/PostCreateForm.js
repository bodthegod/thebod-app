import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import Upload from "../../assets/upload-img.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/LogInSignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/PostCreateEditForm.module.css";
import assetStyles from "../../styles/Asset.module.css";
import { CSSTransition } from "react-transition-group";
import Asset from "../../components/Asset";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    tags: "",
    content: "",
    image: "",
  });

  const { title, tags, content, image } = postData;

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image); // clears browser reference to previous file
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Enter Your Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          className={`${formStyles.Form} ${inputStyles.Input}`}
          value={title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Choose your tag!</Form.Label>
        <Form.Control
          as="select"
          className={`${formStyles.Form}`}
          value={tags}
          onChange={handleChange}
        >
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
          value={content}
          onChange={handleChange}
        />
      </Form.Group>

      <Button className={btnStyles.Button} type="submit">
        Create
      </Button>

      <Button className={`${btnStyles.Button} mx-3`} onClick={() => {}}>
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
                {image ? (
                    <>
                    <figure>
                        <Image className={appStyles.Image} src={image} rounded/>
                    </figure>
                    <div>
                    <Form.Label
                    className={`${btnStyles.Button} btn`}
                    type="submit"
                    htmlFor="image-upload">
                        Change Image
                    </Form.Label>
                    </div>
                    </>
                ) : (
                    <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    alt="Upload"
                    message="Upload your photo here!"
                    className={assetStyles.Asset}
                  />
                </Form.Label>
                )}
                <Form.File
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  hidden
                />
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
