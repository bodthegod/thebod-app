import React from "react";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropdownMenu";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, comment_info } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div>
      <Media>
        <Link to={`/profiles/${profile_id}`} className="my-2">
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center mb-4">
          <div className={styles.CommentSection}>
            <span className={styles.CommentUsername}>{owner}</span>
            <span className={styles.Date}> ~ {updated_at} </span>
            <span className={styles.DropdownMenu}>{is_owner && (
              <DropdownMenu handleEdit={() => {}} handleDelete={() => {}} />
            )}</span> 
          </div>
            <p>{comment_info}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;
