import React from "react";
import Link from "react-router-dom/Link";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropdownMenu";
import Avatar from "../../components/Avatar";
import axios from "axios";
import { RiChat3Line, RiHeartsFill, RiHeartsLine } from "react-icons/ri";
import styles from "../../styles/Post.module.css";
import tagsStyles from "../../styles/GeneralPostsPage.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { axiosReq } from "../../api/axiosDefaults";

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
    setPosts,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  /*
    Allows for edit of post by id
  */
  const handleEdit = () => {
    history.push(`/posts/${id}/edit/`);
  };

  /*
    Handles delete of post by id,
    pushes user to home after
  */
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
      history.push("/");
    } catch (err) {
      return err;
    }
  };

  /*
    Handles like on a post by a user,
    sends API request for a post by id
    and by what profile_id likes it,
    increses like total by one
  */
  const handleLike = async () => {
    try {
      const { data } = await axiosReq.post("/likes/", {
        post: id,
        profile_id: profile_id,
      });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_total: post.likes_total + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      return err;
    }
  };

  /*
    Handles unlike on a post by a user,
    sends API request for a post by id
    Decreases likes total by one
  */
  const handleUnlike = async () => {
    try {
      await axios.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_total: post.likes_total - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      return err;
    }
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
      <Card className={styles.Post}>
        <Card.Body>
          <Media className={styles.Container}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className={styles.AvatarPos}>
              <span className={`${styles.UpdatedAt} ${styles.GentleShake}`}>
                {updated_at}
              </span>
              <div className={styles.EditBtn}>
                {is_owner && postPage && (
                  <DropdownMenu
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          </Media>
        </Card.Body>
        <Link to={`/posts/${id}/`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {content && <Card.Text>{content}</Card.Text>}
          {tags && (
            <Card.Text>
              <Badge variant="primary" className={tagsStyles.Tags}>
                <span>{tags}</span>
              </Badge>
            </Card.Text>
          )}
          <div>
            {is_owner ? (
              // if owner of post, cannot like
              <OverlayTrigger
                placement="top"
                aria-label="You cant heart this"
                overlay={<Tooltip>You can&apos;t heart this!</Tooltip>}
              >
                <i className={styles.Icon}>
                  <RiHeartsLine />
                </i>
              </OverlayTrigger>
            ) : like_id ? (
              // has post been liked check
              <span onClick={handleUnlike} aria-label="Unlike Post">
                <i className={styles.LikedIcon}>
                  <RiHeartsFill />
                </i>
              </span>
            ) : currentUser ? (
              // handle like call to allow like post
              <span onClick={handleLike} aria-label="Like Post">
                <i className={styles.Icon}>
                  <RiHeartsLine />
                </i>
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                aria-label="Log in to heart this post"
                overlay={<Tooltip>Log in to heart this post!</Tooltip>}
              >
                <i className={styles.Icon}>
                  <RiHeartsLine />
                </i>
              </OverlayTrigger>
            )}
            {likes_total}
            <Link aria-label="comments total" to={`/posts/${id}/`}>
              <i className={`${styles.Icon}`}>
                <RiChat3Line />
              </i>
            </Link>
            {comments_total}
          </div>
        </Card.Body>
      </Card>
    </CSSTransition>
  );
};

export default Post;
