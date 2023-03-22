import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import alertStyles from "../../styles/PostCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/LogInSignUpForm.module.css";
import { CSSTransition } from "react-transition-group";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (err) {
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label className="font-weight-bold">My Profile bio:</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          rows={7}
          className={inputStyles.Input}
        />
      </Form.Group>

      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" className={alertStyles.AlertStyles} key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`my-3 ${btnStyles.Button}`}
        onMouseDown={(e) => e.preventDefault()}
        type="save"
      >
        Save Changes
      </Button>

      <Button
        className={`mx-3 ${btnStyles.CancelButton}`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => history.goBack()}
      >
        Cancel Changes
      </Button>
    </>
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
          <Col
            className="d-none d-md-block p-0 p-md-2 text-center"
            md={8}
            lg={8}
          >
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
          <Col className="py-2 p-0 p-md-2 text-center" md={4} lg={4}>
            <Container className={appStyles.Content}>
              <Form.Group>
                {image && (
                  <figure>
                    <Image src={image} alt="Your new profile picture" fluid />
                  </figure>
                )}

                <div>
                  <Form.Label
                    className={`${btnStyles.Button} btn my-auto mb-sm-4`}
                    htmlFor="image-upload"
                  >
                    Change avatar
                  </Form.Label>
                </div>
                <Form.File
                  id="image-upload"
                  ref={imageFile}
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      setProfileData({
                        ...profileData,
                        image: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
                />
              </Form.Group>
              {errors?.image?.map((message, idx) => (
                <Alert
                  variant="warning"
                  className={alertStyles.AlertStyles}
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
};

export default ProfileEditForm;
