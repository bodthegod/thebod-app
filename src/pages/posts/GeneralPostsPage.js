import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import appStyles from "../../App.module.css";
import Toolbar from "../../components/Toolbar.js";

function GeneralPostsPage() {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
    <Container>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          <Container className={`${appStyles.Content} mb-3`}>
            Search by tags
          </Container>
          <Container className={`${appStyles.Content} mb-3`}>
            Most followed bloggers
          </Container>
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={6}></Col>
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          <Toolbar />
        </Col>
      </Row>
    </Container>
    </CSSTransition>
  );
}

export default GeneralPostsPage;
