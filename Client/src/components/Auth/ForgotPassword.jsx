import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../Axios/AxiosInstance";
import AnimationForget from "../../assets/animations/forgotPassword.json";
import AnimationMailSent from "../../assets/animations/mail_sent.json";
import Logo from "../../assets/Logo.svg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const ForgetAnimation = useRef();

  const navigate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/auth/forgot-password", {
        email,
      });
      if (response.status === 200) {
        // toast.success("Password reset email sent successfully.");
        setShowModal(true);
      } else {
        toast.error("Failed to send password reset email.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Failed to send password reset email."
        );
      } else {
        toast.error("Failed to send password reset email.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      navigate("/");
    }, 1300);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <img
              src={Logo}
              alt="Query Quest"
              style={{ width: "169px", marginRight: "10px" }}
            />
          </div>
          <h2 className="text-center mb-4">Forgot Password ?</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <p className="text-muted mb-4">
              We'll send a link to reset your password.
            </p>
            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{ backgroundColor: "#2E69FF" }}
            >
              Send mail
            </button>
          </form>
          <p className="mt-4 text-center">
            Ahh.. Now I remember my password{" "}
            <Link to="/" className="text-primary">
              Log in
            </Link>
          </p>
        </div>
        <div className="col-md-6 d-none d-md-block">
          <Lottie
            lottieRef={ForgetAnimation}
            animationData={AnimationForget}
            style={{ height: "500px" }}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
              <Lottie
                animationData={AnimationMailSent}
                style={{ height: "350px" }}
              />
              <p className="mt-3">
                We've sent a password reset link to <strong>{email}</strong>.
                Please check your email and follow the instructions to reset
                your password.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background blur */}
      {showModal && (
        <div
          className="modal-backdrop show"
          style={{
            backdropFilter: "blur(25px)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        ></div>
      )}
    </div>
  );
};

export default ForgotPassword;
