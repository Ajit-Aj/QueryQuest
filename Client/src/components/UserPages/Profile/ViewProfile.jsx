import React, { useEffect, useState, useContext } from "react";
import AxiosInstance from "../../Axios/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../../context/AuthContext";

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const { id, name } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return; // Ensure `id` exists before making the request

      try {
        const response = await AxiosInstance.get(`/api/auth/usersById/${id}`);
        // const response = await AxiosInstance.get(`/api/auth/profile/${id}`);
        const userData = response.data;

        setUser(userData);
        setNewUserName(userData.name);
        setNewBio(userData.bio);

        // Ensure correct profile image path is used
        if (userData.profileImage) {
          setProfileImage(`http://localhost:5000/${userData.profileImage}`);
        } else {
          setProfileImage(
            "https://th.bing.com/th/id/OIP.T9s09Pl74H7Yzy0Wdj5ZjQHaHa?rs=1&pid=ImgDetMain"
          );
        }
      } catch (error) {
        setError("Error fetching user data");
        toast.error(error.message || "Error fetching user data");
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, []);
  const handleSaveChanges = async () => {
    try {
      const updateData = {};

      if (newUserName.trim() !== "") {
        updateData.newUsername = newUserName;
      }
      if (newBio.trim() !== "") {
        updateData.newBio = newBio;
      }

      // Update user details (username & bio)
      if (Object.keys(updateData).length > 0) {
        const usernameUpdateResponse = await AxiosInstance.patch(
          `/api/auth/profile/userdetails/${id}`,

          updateData
        );

        if (
          usernameUpdateResponse.status === 200 ||
          usernameUpdateResponse.data.message.includes("updated")
        ) {
          toast.success("Profile updated successfully");
          setUser((prevUser) => ({
            ...prevUser,
            name: newUserName,
            bio: newBio,
          }));
        } else {
          throw new Error("Failed to update username and bio");
        }
      }

      // Update profile image
      if (newProfileImage) {
        const formData = new FormData();
        formData.append("profileImage", newProfileImage);
        const imageUpdateResponse = await AxiosInstance.patch(
          `/api/auth/update-profile-picture/${id}`,
          formData
        );
        if (imageUpdateResponse.status === 200) {
          toast.success("Profile image updated successfully");
          setProfileImage(URL.createObjectURL(newProfileImage));
        } else {
          throw new Error("Failed to update profile image");
        }
      }

      setShowModal(false);
    } catch (error) {
      toast.error(error.message || "Error updating profile");
    }
  };

  const handleDeleteProfileImage = async () => {
    try {
      await AxiosInstance.delete(`/api/auth/delete-profile-picture/${id}`);
      toast.success("Profile picture deleted successfully");
      setProfileImage(
        "https://th.bing.com/th/id/OIP.T9s09Pl74H7Yzy0Wdj5ZjQHaHa?rs=1&pid=ImgDetMain"
      );
      setNewProfileImage(null);
    } catch (error) {
      toast.error(error.message || "Error deleting profile picture");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div
            className="card"
            style={{
              borderRadius: "10px",
              padding: "10px",
              border: "0.1px solid #d3d3d3",
              backgroundColor: "white",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="text-end">
              <FaPen
                style={{ cursor: "pointer" }}
                title="Edit profile"
                size={20}
                onClick={() => setShowModal(true)}
                className="me-2 text-primary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Edit profile"
              />
            </div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src={`http://localhost:4000/${user.profileImage}`}
                alt={`${user.name}'s profile pic`}
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />

              <div className="ms-4 text-center  p-3 shadow-sm">
                <h3 className="mb-3">{user.name}</h3>
                <div className="d-flex justify-content-center">
                  <p className="mb-0 me-2 text-muted">
                    <span style={{ fontWeight: "500", marginRight: "5px" }}>
                      {user.followers.length}
                    </span>{" "}
                    Followers
                  </p>
                  <p className="mb-0 text-muted">
                    <span style={{ fontWeight: "600", marginRight: "5px" }}>
                      {user.following.length}
                    </span>{" "}
                    Following
                  </p>
                </div>
              </div>
            </div>
            <p
              style={{ border: "1px solid grey", borderRadius: "10px" }}
              className="text-center ms-4"
            >
              {user.bio}
            </p>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              className="form-control"
              id="bio"
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              className="form-control"
              id="profileImage"
              onChange={(e) => setNewProfileImage(e.target.files[0])}
            />
            {profileImage && !newProfileImage && (
              <div className="mt-2">
                <img
                  src={`http://localhost:4000/${user.profileImage}`}
                  alt="Current Profile"
                  className="img-fluid rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
                <Button
                  variant="danger"
                  className="m-2 "
                  onClick={handleDeleteProfileImage}
                >
                  Delete Image
                </Button>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SettingsPage;
