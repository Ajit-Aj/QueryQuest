import React, { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../App.css";
import Logo from "../../../assets/Logo.svg";
import Profile from "../../../assets/profile.jpg";
import Quest from "../../../assets/images/logos/Logo_blue.svg";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Modal,
  Tabs,
  Tab,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  FaBell,
  FaHome,
  FaList,
  FaPen,
  FaGift,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import AxiosInstance from "../../Axios/AxiosInstance";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import "./CustomNavbar.css";

const CustomNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("addQuestion");
  const [selectedImage, setSelectedImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const {
    name: userName,
    clearAuthInfo,
    profileImage,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const displayImage = profileImage
    ? profileImage
    : "https://th.bing.com/th/id/OIP.T9s09Pl74H7Yzy0Wdj5ZjQHaHa?rs=1&pid=ImgDetMain";

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAddQuestion = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await AxiosInstance.post("/api/questions/create", {
          title: formData.title,
          content: formData.content,
        });
        toast.success(response.data.message);
        handleClose();
      } catch (error) {
        toast.error("Failed to add question");
      }
    },
    [formData]
  );

  const handleCreatePost = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("content", post);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      try {
        const response = await AxiosInstance.post(
          "/api/posts/create-post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(response.data.message);
        handleClose();
      } catch (error) {
        toast.error("Failed to create post");
      }
    },
    [post, selectedImage]
  );

  const handleChangeQuestion = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = useCallback(() => {
    clearAuthInfo();
  }, [clearAuthInfo]);

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className="px-3 sticky-top shadow-sm d-none d-lg-flex"
      >
        <Navbar.Brand href="/user" className="d-flex align-items-center">
          <img src={Logo} alt="Query Quest" className="navbar-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex justify-content-evenly gap-3"
        >
          <Nav className="d-flex align-items-center gap-2">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-home">Home</Tooltip>}
            >
              <Nav.Link href="/user">
                <FaHome />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-list">List</Tooltip>}
            >
              <Nav.Link href="#list">
                <FaList />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-questions">Questions</Tooltip>}
            >
              <Nav.Link href="/question/questionforyou">
                <FaPen />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-gift">Gift</Tooltip>}
            >
              <Nav.Link href="#gift">
                <FaGift />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltip-notifications">Notifications</Tooltip>
              }
            >
              <Nav.Link href="#notifications">
                <FaBell />
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Search Quora"
              className="mr-2 search-input"
            />
          </Form>
          <div className="d-flex align-items-center gap-2">
            <Button className="bg-primary add-button" onClick={handleShow}>
              Add Question <span>&#x25BE;</span>
            </Button>
            <Dropdown className="py-1">
              <Dropdown.Toggle variant="link" bsPrefix="p-0">
                <img
                  // src={`REACT_APP_BACKEND_URL${user.profileImage}`}
                  src={`http://localhost:4000/${displayImage}`}
                  alt="Profile"
                  className="profile-pic"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item
                  onClick={() => navigate("/settings-page/profile")}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/settings")}>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/help")}>
                  Help
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <p className="m-0">
              Hi, <span>{userName}</span>
            </p>
          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* Mobile Navbar */}
      <div className="mobile-navbar d-lg-none">
        <nav className="d-flex justify-content-between w-100 py-1.5">
          <Nav.Link href="#search" onClick={handleShow}>
            <FaSearch /> Search
          </Nav.Link>
          <img src={Quest} alt="Quest Logo" />
          <Nav.Link href="#add" onClick={handleShow}>
            <FaPlus /> Add
          </Nav.Link>
        </nav>
      </div>

      {/* <div className="d-flex justify-content-evenly mobile-nav-buttons g d-lg-none">
        <Nav.Link href="home">
          <FaHome />
        </Nav.Link>
        <Nav.Link href="#list">
          <FaList />
        </Nav.Link>
        <Nav.Link href="questions-for-you">
          <FaPen />
        </Nav.Link>
        <Nav.Link href="#gift">
          <FaGift />
        </Nav.Link>
        <Nav.Link href="#notifications">
          <FaBell />
        </Nav.Link>
        <img src={Profile} alt="Profile" className="mobile-profile-pic" />
      </div> */}

      <div className="d-flex justify-content-evenly mobile-nav-buttons g d-lg-none">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-home">Home</Tooltip>}
        >
          <Nav.Link href="home">
            <FaHome />
          </Nav.Link>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-list">List</Tooltip>}
        >
          <Nav.Link href="#list">
            <FaList />
          </Nav.Link>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-questions">Questions</Tooltip>}
        >
          <Nav.Link href="questions-for-you">
            <FaPen />
          </Nav.Link>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-gift">Gift</Tooltip>}
        >
          <Nav.Link href="#gift">
            <FaGift />
          </Nav.Link>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-notifications">Notifications</Tooltip>}
        >
          <Nav.Link href="#notifications">
            <FaBell />
          </Nav.Link>
        </OverlayTrigger>
        <img src={Profile} alt="Profile" className="mobile-profile-pic" />
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <Tabs
              activeKey={activeTab}
              onSelect={(e) => setActiveTab(e)}
              className="mb-3"
            >
              <Tab eventKey="addQuestion" title="Add Question" tab-title-custom>
                <div className="card shadow-sm tips-card">
                  <p className="tips-text">
                    Tips on getting good answers quickly
                  </p>
                  <ul className="tips-list">
                    <li>Make sure your question has not been asked already</li>
                    <li>Keep your question short and to the point</li>
                    <li>Double-check grammar and spelling</li>
                  </ul>
                </div>
                <Form className="py-3" onSubmit={handleAddQuestion}>
                  <Form.Group>
                    <Form.Label>Question Title</Form.Label>
                    <FormControl
                      as="textarea"
                      rows={2}
                      name="title"
                      placeholder="Enter your question title here"
                      value={formData.title}
                      onChange={handleChangeQuestion}
                    />
                    <Form.Label>Content</Form.Label>
                    <FormControl
                      as="textarea"
                      rows={3}
                      name="content"
                      placeholder="Enter your question content here"
                      value={formData.content}
                      onChange={handleChangeQuestion}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="mt-3">
                    Add Question
                  </Button>
                </Form>
              </Tab>
              <Tab eventKey="createPost" title="Create Post">
                <Form onSubmit={handleCreatePost} className="p-2">
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: "18px" }}>
                      Post Content
                    </Form.Label>
                    <FormControl
                      as="textarea"
                      rows={4}
                      placeholder="Write your post here"
                      value={post}
                      onChange={(e) => setPost(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={{ fontSize: "18px" }}>
                      Image (optional)
                    </Form.Label>
                    <FormControl
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="selected-image"
                      />
                    )}
                  </Form.Group>
                  <Button type="submit" variant="primary" className="mt-3">
                    Create Post
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default CustomNavbar;
