import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

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

        <Col className="py-2 p-0 p-lg-2" lg={6}>
          <Container className={`${appStyles.Content} mb-2`}>
            <Post {...post.results[0]} setPosts={setPost} postPage/>
          </Container>
          <Container className={`${appStyles.Content} mt-3 mb-3`}>
            Comments
          </Container>
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          <Container className={`${appStyles.Content} mb-3`}>
            Like, feed
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;
