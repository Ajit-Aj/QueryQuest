import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import AnimationRest from "../../assets/animations/RESET_PWD.json";
import axiosInstance from "../Axios/AxiosInstance";
import Lottie from "lottie-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axiosInstance.post("api/auth/reset-password", {
        resetToken: token,
        newPassword,
      });
      setMessage("Password reset successful");
      setError("");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Password reset failed");
      setMessage("");
    }
  };

  const RestAnimation = useRef();

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card
            className="shadow-lg p-4 mt-4 border-0 "
            style={{ marginTop: "20%" }}
          >
            <Card.Body>
              <h3 className="text-center py-3">Reset Password</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <div className="input-group border-0">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      className="input-group-text"
                      style={{ borderColor: "#DEE2E6" }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-block mt-3"
                >
                  Reset Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="d-none d-md-block text-center">
          <div>
            <h1
              className="text-primary"
              style={{ fontFamily: "Inknut Antiqua", fontSize: "42px" }}
            >
              Query <b>Quest</b>
            </h1>
            <p className="text-muted">
              Empowering Ideas, One Discussion at a Time
            </p>
            <Lottie
              style={{ height: "400px" }}
              lottieRef={RestAnimation}
              animationData={AnimationRest}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
