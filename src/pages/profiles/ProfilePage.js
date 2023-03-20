import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilePage.module.css";
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
  const { profilePage } = useProfileData();
  const [profile] = profilePage.results;
  const is_owner = currentUser?.username === profile?.owner;

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
          <Image
            roundedCircle
            className={styles.UserAvatar}
            src={profile?.image}
          />
        </Col>
        <Col lg={4}>
          <h3 className="mt-2 mb-4">{profile?.owner}</h3>
          <p className={styles.UserSocialNumbers}>
            Posts
            <span>{profile?.posts_total}</span>
          </p>
          <p className={styles.UserSocialNumbers}>
            Followers
            <span>{profile?.followers_total}</span>
          </p>
          <p className={styles.UserSocialNumbers}>
            Following
            <span>{profile?.following_total}</span>
          </p>
        </Col>
        <Col lg={4} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button className={`${styles.FollowButton}`} onClick={() => {}}>
                unfollow
              </Button>
            ) : (
              <Button className={`${styles.FollowButton}`} onClick={() => {}}>
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && (<Col className="p-2">{profile.content}</Col>)}
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

          <Container className={`${appStyles.Content} mb-2`}>
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
