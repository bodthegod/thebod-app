import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import Upload from "../../assets/upload-img.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/LogInSignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/PostCreateEditForm.module.css";
import assetStyles from "../../styles/Asset.module.css";
import { CSSTransition } from "react-transition-group";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    tags: "",
    content: "",
    image: "",
  });

  const { title, tags, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Enter your title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          className={`${formStyles.Form} ${inputStyles.Input}`}
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" className={styles.AlertStyles} key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Choose your tag!</Form.Label>
        <Form.Control
          as="select"
          name="tags"
          className={`${formStyles.Form}`}
          value={tags}
          onChange={handleChange}
        >
          <option value="Bodybuilding">BodyBuilding</option>
          <option value="Running">Running</option>
          <option value="Sports">Sports</option>
          <option value="Fitness">Fitness</option>
          <option value="Wellbeing">Wellbeing</option>
          <option value="Strength Training">Strength Training</option>
          <option value="Hypertrophy">Hypertrophy</option>
          <option value="CrossFit">CrossFit</option>
        </Form.Control>
      </Form.Group>
      {errors.tags?.map((message, idx) => (
        <Alert variant="warning" className={styles.AlertStyles} key={idx}>
          {message}
        </Alert>
      ))}

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
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" className={styles.AlertStyles} key={idx}>
          {message}
        </Alert>
      ))}

      <Button className={btnStyles.Button} type="submit">
        Create Post
      </Button>

      <Button
        className={`${btnStyles.CancelButton} mx-3`}
        onClick={() => history.goBack()}
      >
        Cancel Post
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
      <Form onSubmit={handleSubmit}>
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
                      <Image
                        className={styles.ImageInput}
                        src={image}
                        alt="Your new uploaded image"
                        rounded
                      />
                    </figure>
                    <div>
                      <Form.Label
                        className={`${btnStyles.Button} btn`}
                        type="submit"
                        htmlFor="image-upload"
                      >
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
                  ref={imageInput}
                  className="d-none"
                />
              </Form.Group>
              {errors.image?.map((message, idx) => (
                <Alert
                  variant="warning"
                  className={styles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}

              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
        </Row>
      </Form>
    </CSSTransition>
  );
}

export default PostCreateForm;
