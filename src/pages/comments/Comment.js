import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropdownMenu";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    comment_info,
    id,
    setPost,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const [showEditForm, setShowEditForm] = useState(false);
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_total: prevPost.results[0].comments_total - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

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
            <span className={styles.DropdownMenu}>
              {is_owner && !showEditForm && (
                <DropdownMenu
                  handleEdit={() => setShowEditForm(true)}
                  handleDelete={handleDelete}
                />
              )}
            </span>
          </div>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              profile_image={profile_image}
              comment_info={comment_info}
              setShowEditForm={setShowEditForm}
              setComments={setComments}
            />
          ) : (
            <p>{comment_info}</p>
          )}
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;
