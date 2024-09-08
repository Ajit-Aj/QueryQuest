import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../Axios/AxiosInstance";
import {
  FaQuestion,
  FaRegEdit,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaShare,
  FaPaperPlane,
  FaReply,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "../../../assets/profile.jpg";
import { Modal, Button, Container } from "react-bootstrap";
import useFetch from "../../Custom Hooks/UseFetch";
import Loader from "../../../utils/Loader";
import { AuthContext } from "../../../context/AuthContext";
// import CustomNavbar from "../Navbar/Navbar";

const ArticleCard = () => {
  const [posts, setPosts] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [comment, setComment] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showReplies, setShowReplies] = useState(null);
  const [userID, setUserID] = useState("");
  const [followStatus, setFollowStatus] = useState({});
  const { id, name, profileImage } = useContext(AuthContext);

  const { data, loading, error } = useFetch("/api/posts/all");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (data || error) {
      try {
        setPosts(data);
      } catch (error) {
        console.error("Error fetching post data", error);
      }
    }
  }, [data, error]);

  useEffect(() => {
    if (id && name) {
      setCurrentUser(name);
      setUserID(id);
    }
  }, [id, name]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userID) {
        try {
          const response = await axiosInstance.get(
            `/api/auth/usersById/${userID}`
          );
          const user = response.data;
          const followStatus = {};

          // Map following users to a status object
          user.followingDetails.forEach((user) => {
            followStatus[user._id] = true;
          });
          setFollowStatus(followStatus);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    fetchUserData();
  }, [userID]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Loader />
      </Container>
    );
  }

  const handleFollowToggle = async (userId) => {
    try {
      // Make the request to toggle follow/unfollow
      await axiosInstance.post(`/api/users/follow-unfollow/${userId}`);

      // Update follow status locally
      setFollowStatus((prevState) => ({
        ...prevState,
        [userId]: !prevState[userId],
      }));
    } catch (error) {
      console.error("Error toggling follow status", error);
    }
  };

  const handleUpVotePost = async (postId) => {
    try {
      const post = posts.find((p) => p._id === postId);
      const userHasLiked = post.upvotes.includes(userID);
      const userHasDisliked = post.downvotes.includes(userID);

      // If the user has already disliked, undo the dislike first
      if (userHasDisliked) {
        await axiosInstance.post(`/api/posts/downvote/${postId}`);
      }

      if (userHasLiked) {
        // If already liked, undo the like
        await axiosInstance.post(`/api/posts/upvote/${postId}`);
      } else {
        // Otherwise, like the post

        await axiosInstance.post(`/api/posts/upvote/${postId}`);
      }

      const response = await axiosInstance.get("/api/posts/all");
      setPosts(response.data);
    } catch (error) {
      console.error("Error handling upvote", error);
    }
  };

  const handleDownVotePost = async (postId) => {
    try {
      const post = posts.find((p) => p._id === postId);
      const userHasLiked = post.upvotes.includes(userID);
      const userHasDisliked = post.downvotes.includes(userID);

      // If the user has already liked, undo the like first
      if (userHasLiked) {
        await axiosInstance.post(`/api/posts/upvote/${postId}`);
      }

      if (userHasDisliked) {
        // If already disliked, undo the dislike
        await axiosInstance.post(`/api/posts/downvote/${postId}`);
      } else {
        // Otherwise, dislike the post
        await axiosInstance.post(`/api/posts/downvote/${postId}`);
      }

      const response = await axiosInstance.get("/api/posts/all");
      setPosts(response.data);
    } catch (error) {
      console.error("Error handling downvote", error);
    }
  };

  const handleCommentIconClick = (postId) => {
    setShowCommentBox(showCommentBox === postId ? null : postId);
    setShowReplyBox(null);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (postId) => {
    try {
      await axiosInstance.post(`/api/comments/${postId}`, { content: comment });
      setComment("");
      setShowCommentBox(null);
      const response = await axiosInstance.get("/api/posts/all");

      setPosts(response.data);
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  const handleReplyChange = (e, commentId) => {
    setReplyContent({
      ...replyContent,
      [commentId]: e.target.value,
    });
  };

  const handleReplySubmit = async (postId, commentId) => {
    try {
      await axiosInstance.post(`/api/comments/${postId}/replies/${commentId}`, {
        content: replyContent[commentId],
      });
      setReplyContent({
        ...replyContent,
        [commentId]: "",
      });
      setShowReplyBox(null);
      const response = await axiosInstance.get("/api/posts/all");
      // const { data } = useFetch("/api/posts/all");
      setPosts(response.data);
    } catch (error) {
      console.error("Error submitting reply", error);
    }
  };

  const handleLikeComment = async (postId, commentId) => {
    try {
      await axiosInstance.post(`/api/comments/${postId}/upvote/${commentId}`);
      const response = await axiosInstance.get("/api/posts/all");
      setPosts(response.data);
    } catch (error) {
      console.error("Error submitting upvote comment", error);
    }
  };

  const handleDislikeComment = async (postId, commentId) => {
    try {
      await axiosInstance.post(`/api/comments/${postId}/downvote/${commentId}`);
      const response = await axiosInstance.get("/api/posts/all");
      setPosts(response.data);
    } catch (error) {
      console.error("Error submitting downvote comment", error);
    }
  };

  const handleLikeReplyComment = async (postId, commentId, replyId) => {
    try {
      await axiosInstance.post(
        `/api/comments/${postId}/comments/${commentId}/replies/${replyId}/upvote`
      );
      const response = await axiosInstance.get("/api/posts/all");
      setPosts(response.data);
    } catch (error) {
      console.error("Error submitting upvote reply comment", error);
    }
  };

  const handleDislikeReplyComment = async (postId, commentId, replyId) => {
    try {
      await axiosInstance.post(
        `/api/comments/${postId}/comments/${commentId}/replies/${replyId}/downvote`
      );
      const response = await axiosInstance.get("/api/posts/all");
      setPosts(response.data);
    } catch (error) {
      console.error("Error submitting downvote  reply comment", error);
    }
  };

  const handleDeleteClick = (postId, commentId) => {
    setCommentToDelete({ postId, commentId });
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (commentToDelete) {
      try {
        await axiosInstance.delete(
          `/api/comments/${commentToDelete.postId}/comments/${commentToDelete.commentId}`
        );
        const response = await axiosInstance.get("/api/posts/all");

        setPosts(response.data);

        setShowDeleteModal(false);
        setCommentToDelete(null);
      } catch (error) {
        console.error("Error deleting comment", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Loader />
      </Container>
    );
  }

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      {/* <CustomNavbar /> */}
      <div className="mt-3 container">
        {/* First Card */}
        <div
          className="card mb-3 shadow-sm"
          style={{
            borderRadius: "10px",
            padding: "10px",
            border: "0.1px solid #d3d3d3",
            backgroundColor: "white",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <img
                src={
                  profileImage
                    ? `${backendUrl}${profileImage}`
                    : "https://th.bing.com/th/id/OIP.T9s09Pl74H7Yzy0Wdj5ZjQHaHa?rs=1&pid=ImgDetMain"
                }
                alt="Profile"
                className="rounded-circle"
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className="d-flex justify-content-center mt-3 align-items-center flex-wrap">
              <div className="action-button mx-2 my-1">
                <FaQuestion className="icon" /> Ask
              </div>
              <span className="separator mx-2">|</span>
              <div className="action-button mx-2 my-1">
                <FaRegEdit className="icon" /> Answer
              </div>
              <span className="separator mx-2">|</span>
              <div className="action-button mx-2 my-1">
                <FaPaperPlane className="icon" /> Post
              </div>
            </div>
          </div>
        </div>
        {/* Render all posts */}

        {sortedPosts.map((post) => (
          <div
            key={post._id}
            className="card mb-3 shadow-sm"
            style={{
              borderRadius: "10px",
              padding: "10px",
              border: "0.1px solid #d3d3d3",
              backgroundColor: "white",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="d-flex align-items-center">
              <img
                src={
                  post.user && post.user.profileImage
                    ? `${backendUrl}${post.user.profileImage}`
                    : "https://th.bing.com/th/id/OIP.T9s09Pl74H7Yzy0Wdj5ZjQHaHa?rs=1&pid=ImgDetMain"
                }
                alt="Profile"
                className="rounded-circle"
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />

              <div className="d-flex flex-column">
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <>
                    <h6 className="mb-0 mr-2">
                      {post.user ? post.user.name : "Default Name"}
                    </h6>

                    {post.user && post.user._id !== id ? (
                      <button
                        className={`btn btn-link ml-auto p-0 m-0${
                          followStatus[post.user._id]
                            ? "btn-success"
                            : "btn-outline-success"
                        }`}
                        onClick={() =>
                          post.user && handleFollowToggle(post.user._id)
                        }
                      >
                        {followStatus[post.user._id] ? "Following" : "Follow"}
                      </button>
                    ) : (
                      <span className="ml-auto" style={{ color: "grey" }}>
                        You
                      </span>
                    )}
                  </>
                </div>
                <div>
                  <small className="text-muted">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </small>
                </div>
              </div>
            </div>

            <h6 className="p-2">{post.content}</h6>

            {post.image && (
              <img
                src={`${backendUrl}${post.image}`}
                alt={`${post.user.name}'s post`}
              />
            )}

            <div className="card-footer d-flex justify-content-between ">
              <div className="d-flex align-items-center">
                <FaThumbsUp
                  onClick={() => handleUpVotePost(post._id)}
                  className="icon"
                />
                <span className="ml-2">{post.upvotes.length}</span>
              </div>
              <div className="d-flex align-items-center">
                <FaThumbsDown
                  onClick={() => handleDownVotePost(post._id)}
                  className="icon"
                />
                <span className="ml-2">{post.downvotes.length}</span>
              </div>
              <div
                className="d-flex align-items-center"
                onClick={() => handleCommentIconClick(post._id)}
                style={{ cursor: "pointer" }}
              >
                <FaComment className="icon" />
                <span className="ml-2">{post.comments.length}</span>
              </div>
              <div className="d-flex align-items-center">
                <FaShare className="icon" />
                <span className="ml-2">Share</span>
              </div>
            </div>

            {showCommentBox === post._id && (
              <>
                <div className="mt-3 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission or any other default action
                        handleCommentSubmit(post._id); // Submit the comment
                      }
                    }}
                  />
                  <button
                    className="btn btn-primary ml-2"
                    onClick={() => handleCommentSubmit(post._id)}
                  >
                    <FaPaperPlane />
                  </button>
                </div>

                <div className="mt-3">
                  {post.comments
                    .slice()
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((comment) => (
                      <li key={comment._id} className=" list-unstyled">
                        <div className="d-flex align-items-center gap-3">
                          <div className="d-flex align-items-center gap-1">
                            <img
                           
                              src={`${backendUrl}${comment.user.profileImage}`}
                              className="rounded-circle"
                              alt="Profile"
                              style={{
                                width: "40px",
                                height: "40px",
                                marginRight: "10px",
                              }}
                            />
                            <div className="d-flex-column">
                              <h6 className="mb-0">{comment.user.name}</h6>
                              <span
                                className="text-muted"
                                style={{ fontSize: "12px" }}
                              >
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {comment.replies.length > 0 && (
                              <span
                                className="btn btn-link"
                                onClick={() =>
                                  setShowReplies(
                                    showReplies === comment._id
                                      ? null
                                      : comment._id
                                  )
                                }
                              >
                                Replies {comment.replies.length}
                              </span>
                            )}
                          </div>{" "}
                          {/* icon */}
                          <div className="ml-auto">
                            {(currentUser === post.user.name ||
                              currentUser === comment.user.name) && (
                              <span
                                className="btn btn-link text-danger"
                                onClick={() =>
                                  handleDeleteClick(post._id, comment._id)
                                }
                                style={{ cursor: "pointer", fontSize: "14px" }}
                              >
                                Remove
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <span
                            className="mx-4 my-2"
                            style={{ fontSize: "16px" }}
                          >
                            {comment.content}
                          </span>
                          <span
                            className="btn btn-link"
                            style={{ fontSize: "14px", padding: "0" }}
                            onClick={() =>
                              setShowReplyBox(
                                showReplyBox === comment._id
                                  ? null
                                  : comment._id
                              )
                            }
                          >
                            Reply
                          </span>

                          {currentUser !== comment.user.name ? (
                            <div className="d-flex align-items-center ml-2">
                              <div className="d-flex align-items-center gap-1 m-1">
                                <FaThumbsUp
                                  className="icon"
                                  style={{
                                    fontSize: "12px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleLikeComment(post._id, comment._id)
                                  }
                                />
                                <span
                                  className="ml-1"
                                  style={{ fontSize: "12px" }}
                                >
                                  {comment.upvotes.length}
                                </span>
                              </div>
                              <div className="d-flex align-items-center gap-1 m-1">
                                <FaThumbsDown
                                  className="icon"
                                  style={{
                                    fontSize: "12px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleDislikeComment(post._id, comment._id)
                                  }
                                />
                                <span
                                  className="ml-1"
                                  style={{ fontSize: "12px" }}
                                >
                                  {comment.downvotes.length}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "gray",
                                margin: "10px 10px",
                              }}
                            >
                              You
                            </span>
                          )}
                        </div>
                        {showReplyBox === comment._id && (
                          <div className="d-flex align-items-center mb-2">
                            <input
                              type="text"
                              className="form-control me-2"
                              placeholder="Add a reply..."
                              value={replyContent[comment._id] || ""}
                              onChange={(e) =>
                                handleReplyChange(e, comment._id)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault(); // Prevent form submission or any other default action
                                  handleReplySubmit(post._id, comment._id); // Submit the reply
                                }
                              }}
                              style={{ maxWidth: "350px" }}
                            />
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                handleReplySubmit(post._id, comment._id)
                              }
                            >
                              <FaPaperPlane />
                            </button>
                          </div>
                        )}

                        {/* For replies */}
                        {comment.replies &&
                          showReplies === comment._id &&
                          comment.replies.map((reply) => (
                            <div
                              key={reply._id}
                              className="m-2 pl-4 border-left"
                              style={{
                                border: "2px solid #ddd",
                                padding: "10px",
                              }}
                            >
                              <div className="d-flex align-items-center">
                                <img
                                  src={`http://localhost:4000/${reply.user.profileImage}`}
                                  className="rounded-circle"
                                  alt="Profile"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    marginRight: "10px",
                                  }}
                                />
                                <div>
                                  <h6 className="mb-0">{reply.user.name}</h6>
                                  <small className="text-muted">
                                    {new Date(
                                      reply.createdAt
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </small>
                                </div>

                                {currentUser !== reply.user.name ? (
                                  <div className="d-flex align-items-center ml-2">
                                    <div className="d-flex align-items-center gap-1 m-1">
                                      <FaThumbsUp
                                        className="icon"
                                        style={{
                                          fontSize: "12px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleLikeReplyComment(
                                            post._id,
                                            comment._id,
                                            reply._id
                                          )
                                        }
                                      />
                                      <span
                                        className="ml-1"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {reply.upvotes.length}
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-1 m-1">
                                      <FaThumbsDown
                                        className="icon"
                                        style={{
                                          fontSize: "12px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleDislikeReplyComment(
                                            post._id,
                                            comment._id,
                                            reply._id
                                          )
                                        }
                                      />
                                      <span
                                        className="ml-1"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {reply.downvotes.length}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      margin: "10px 5px",
                                      color: "gray",
                                    }}
                                  >
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="d-flex ">
                                <span>{reply.content}</span>
                              </div>
                            </div>
                          ))}
                      </li>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}

        <Modal
          show={showDeleteModal}
          onHide={handleDeleteCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ArticleCard;
