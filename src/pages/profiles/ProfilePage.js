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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Post from "../posts/Post";
import NoResultsFoundImage from "../../assets/no-result-found.jpg";
import { CSSTransition } from "react-transition-group";
import { ProfileEditDropdownMenu } from "../../components/DropdownMenu";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { profilePage } = useProfileData();
  const [profile] = profilePage.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profilePage }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          profilePage: { results: [profilePage] },
        }));
        setProfilePosts(profilePosts);
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
          <h3 className="mt-2 mb-4">{profile?.owner}'s profile</h3>
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
          {profile?.is_owner && <ProfileEditDropdownMenu id={profile?.id} />}
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${styles.UnfollowButton}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${styles.FollowButton}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-2">{profile.content}</Col>}
      </Row>
    </>
  );

  const profileDetailPosts = (
    <>
      <hr />
      <p className={`${styles.UserPostsTitle} text-center `}>
        Posts by <strong>{profile?.owner}</strong>
      </p>
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResultsFoundImage}
          message={`It looks like ${profile?.owner} hasn't posted yet... :(`}
        />
      )}
      <hr />
    </>
  );

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
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
    </CSSTransition>
  );
}

export default ProfilePage;
