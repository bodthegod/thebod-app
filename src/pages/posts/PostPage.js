import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Toolbar from "../../components/Toolbar";
import { CSSTransition } from "react-transition-group";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

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

          <Col className="py-2 p-0 p-lg-2" lg={6}>
            <Container className={`${appStyles.Content} mb-2`}>
              <Post {...post.results[0]} setPosts={setPost} postPage />
            </Container>
            <Container className={appStyles.Content}>
              {currentUser ? (
                <CommentCreateForm
                  profileImage={profile_image}
                  profile_id={currentUser.profile_id}
                  post={id}
                  setPost={setPost}
                  setComments={setComments}
                />
              ) : comments.results.length ? (
                "Comments"
              ) : null}
              {comments.results.length ? (
                comments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setComments}
                  />
                ))
              ) : currentUser ? (
                <span>
                  It looks like there's no comments yet, start the conversation?{" "}
                </span>
              ) : (
                <span>No comments yet, log in to comment!</span>
              )}
            </Container>
          </Col>
          <Col className="py-2 p-0 p-lg-2" lg={3}>
            <Toolbar />
          </Col>
        </Row>
      </Container>
    </CSSTransition>
  );
}

export default PostPage;
