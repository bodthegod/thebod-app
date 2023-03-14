import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Toolbar from "../../components/Toolbar.js";

function GeneralPostsPage() {
  return (
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
  );
}

export default GeneralPostsPage;
