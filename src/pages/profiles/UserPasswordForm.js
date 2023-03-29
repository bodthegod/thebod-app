import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/LogInSignUpForm.module.css";
import alertStyles from "../../styles/PostCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import UserFeedbackCue from "../../components/UserFeedbackCue";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;
  const [showPasswordMsg, setPasswordMsg] = useState();
  const [errors, setErrors] = useState({});

  /* 
    Handles changes to user password input form fields
  */
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  /*
    Handles the editing of password, pushes to home
  */
  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  /* 
    Handles the submit of new password data
    Uses history.goBack() to take user back to
    last page they were on- displays password
    edited message
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      setPasswordMsg(true);
      setTimeout(function () {
        history.goBack();
      }, 2000);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
      <Row>
        <Col className="py-2 mx-auto text-center font-weight-bold" md={10}>
          {showPasswordMsg && (
            <UserFeedbackCue
              variant="Info"
              message="Password changed! Taking you back, blogger!"
            />
          )}
          <Container className={appStyles.Content}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>New password</Form.Label>
                <Form.Control
                  placeholder="type your new password"
                  type="password"
                  value={new_password1}
                  onChange={handleChange}
                  name="new_password1"
                  className={`${inputStyles.Input} text-center`}
                />
              </Form.Group>
              {errors?.new_password1?.map((message, idx) => (
                <Alert
                  variant="warning"
                  className={alertStyles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
              <Form.Group>
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  placeholder="confirm new password"
                  type="password"
                  value={new_password2}
                  onChange={handleChange}
                  name="new_password2"
                  className={`${inputStyles.Input} text-center`}
                />
              </Form.Group>
              {errors?.new_password2?.map((message, idx) => (
                <Alert
                  variant="warning"
                  className={alertStyles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
              <Button
                type="submit"
                className={`mx-2 my-2 ${btnStyles.Button}`}
                onMouseDown={(event) => event.preventDefault()}
              >
                Save new password
              </Button>
              <Button
                onMouseDown={(event) => event.preventDefault()}
                className={`mx-2 ${btnStyles.CancelButton}`}
                onClick={() => history.goBack()}
              >
                Go back
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </CSSTransition>
  );
};

export default UserPasswordForm;
