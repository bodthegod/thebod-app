import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import styles from "../../styles/GeneralPostsPage.module.css";
import Asset from "../../components/Asset";
import Toolbar from "../../components/Toolbar.js";
import Post from "./Post";
import NoResultsImage from "../../assets/no-result-found.jpg";
import { CgSearch } from "react-icons/cg";

function GeneralPostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {}
    };

    setHasLoaded(false);
    fetchPosts();
  }, [filter, query, pathname]);

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
              <CgSearch className={styles.SearchIcon}/>
            <Form
              className={styles.SearchBar}
              onSubmit={(e) => e.preventDefault()}
            >
              <Form.Control
                type="text"
                className="mr-sm-2"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>
            {hasLoaded ? (
              <>
                {posts.results.length ? (
                  posts.results.map((post) => (
                    <Post key={post.id} {...post} setPosts={setPosts} />
                  ))
                ) : (
                  <Container className={appStyles.Content}>
                    <Asset
                      src={NoResultsImage}
                      width={40}
                      height={40}
                      message={message}
                    />
                  </Container>
                )}
              </>
            ) : (
              <Container className={appStyles.Content}>
                <Asset spinner />
              </Container>
            )}
          </Col>
          <Col className="py-2 p-0 p-lg-2" lg={3}>
            <Toolbar />
          </Col>
        </Row>
      </Container>
    </CSSTransition>
  );
}

export default GeneralPostsPage;
