import React from "react";
import { Badge, Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Post.module.css";
import appStyles from "../../App.module.css";
import { RiChat3Line, RiHeartsFill, RiHeartsLine } from "react-icons/ri";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    content,
    tags,
    comments_total,
    likes_total,
    like_id,
    image,
    updated_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span className={styles.UpdatedAt}>{updated_at}</span>
            {is_owner && postPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        {tags && (
          <Card.Text>
            Type:
            <Badge variant="secondary" className={styles.PostBadge}>
              {" "}
              {tags}
            </Badge>
          </Card.Text>
        )}
        <div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like this!</Tooltip>}
            >
              <i className={styles.Icon}>
                <RiHeartsLine />
              </i>
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <i className={styles.Icon}>
                <RiHeartsFill />
              </i>
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className={styles.Icon}>
                <RiHeartsLine />
              </i>
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like this post!</Tooltip>}
            >
              <i className={styles.Icon}>
                <RiHeartsLine />
              </i>
            </OverlayTrigger>
          )}
          {likes_total}
          <Link to={`/posts/${id}`}>
            <i className={styles.Icon}>
              <RiChat3Line />
            </i>
          </Link>
          {comments_total}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
