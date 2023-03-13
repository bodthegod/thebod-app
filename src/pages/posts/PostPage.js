import React from "react";
import appStyles from "../../App.module.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


function PostPage() {

  return (
    <Container>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          <Container className={`${appStyles.Content} mb-3`}>Search by tags</Container>
          <Container className={`${appStyles.Content} mb-3`}>Most followed bloggers</Container>
        </Col>

        <Col className="py-2 p-0 p-lg-2" lg={6}>
          <Container className={`${appStyles.Content} mb-2`}><p>Placeholder Post</p></Container>
          <Container className={`${appStyles.Content} mt-3 mb-3`}>Comments</Container>
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          <Container className={`${appStyles.Content} mb-3`}>Like, feed, add</Container>
          </Col>
      </Row>
    </Container>
  );
}

export default PostPage;