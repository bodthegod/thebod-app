import React from "react";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, comment_info } = props;

  return (
    <div>
      <Media>
        <Link to={`/profiles/${profile_id}`} className="my-2">
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center mb-4">
          <div className={styles.CommentSection}>
            <span className={styles.CommentUsername}>{owner}</span>
            <span className={styles.Date}> ~ {updated_at}</span>
            <p>{comment_info}</p>
          </div>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;