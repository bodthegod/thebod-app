import React from "react";
import { Container } from "react-bootstrap";
import styles from "../../styles/PopularProfiles.module.css";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { BiCrown } from "react-icons/bi";
import { useProfileData } from "../../contexts/ProfileDataContext";

const PopularProfiles = () => {
  const { popularProfiles } = useProfileData();

  return (
    <Container className={styles.Content}>
      {popularProfiles.results.length ? (
        <>
          <p className={`${styles.MostFollowedBloggers} text-center`}>
            <BiCrown size={25} className={styles.CrownIcon} /> Most Followed
          </p>
          {popularProfiles.results.map((profile) => (
            <Profile key={profile.id} profile={profile} />
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
