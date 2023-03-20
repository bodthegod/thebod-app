import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import PopularProfiles from "./PopularProfiles";
import Toolbar from "../../components/Toolbar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profilePage }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          profilePage: { results: [profilePage] },
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const profileDetail = (
    <>
      <Row noGutters className="p-3 text-center">
        <Col lg={4} className="text-lg-left">
          <p>Avatar</p>
        </Col>
        <Col lg={4}>
          <h3 className="mt-2 mb-4">Placeholder Username</h3>
          <p>Followers, Following</p>
          <p>Posts</p>
        </Col>
        <Col lg={4} className="text-lg-right">
        <p>Follow button</p>
        </Col>
        <Col className="p-3">Profile content</Col>
      </Row>
    </>
  );

  const profileDetailPosts = (
    <>
      <hr />
      <p className="text-center">Post listing of profile owner's posts</p>
      <hr />
    </>
  );

  return (
    <Container>
      <Row>
        <Col className="pt-2 p-0 g-0" lg={3}>
            <Toolbar />

          <Container
            className={`${appStyles.Content} mb-2`}
          >
            <PopularProfiles />
          </Container>
        </Col>

        <Col className="py-2 p-0 p-lg-2" lg={9}>

    <Container className={appStyles.Content}>
        {hasLoaded ? (
            <>
              {profileDetail}
              {profileDetailPosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>

        </Col>
      </Row>
    </Container>

  );
}

export default ProfilePage;
