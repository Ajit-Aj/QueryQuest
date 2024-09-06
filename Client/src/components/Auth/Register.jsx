import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Lottie from "lottie-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimationSignup from "../../assets/animations/register.json";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/AxiosInstance";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const HomeAnimation = useRef();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (!form.name) {
      formIsValid = false;
      errors.name = "Please enter your name.";
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      formIsValid = false;
      errors.email = "Please enter a valid email address.";
    }
    if (form.password.length < 6) {
      formIsValid = false;
      errors.password = "Password must be at least 6 characters long.";
    }
    if (form.password !== form.confirmPassword) {
      formIsValid = false;
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!form.phone || !/^\d{10}$/.test(form.phone)) {
      formIsValid = false;
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { confirmPassword, ...formData } = form;
        const response = await axiosInstance.post(
          "/api/auth/register",
          formData
        );
        if (response.status === 201 || response.status === 200) {
          toast.success("OTP sent successfully");
          setTimeout(() => {
            navigate(`/verify-otp/${form.email}`);
          }, 1500);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="row w-100 h-100 no-gutters">
        <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
          {!isOtpSent ? (
            <div
              className="card shadow-lg py-3 mt-5 bg-white"
              style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "80px",
                borderStyle: "none",
              }}
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <h2
                  className="card-title text-center mb-4 text-primary"
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                >
                  Sign Up
                </h2>
                <form onSubmit={handleSubmit}>
                  {[
                    { field: "name", placeholder: "Enter your name" },
                    { field: "email", placeholder: "Enter your email" },
                    { field: "password", placeholder: "Enter your password" },
                    { field: "confirmPassword", placeholder: "Confirm your password" },
                    { field: "phone", placeholder: "Enter your phone number" },
                  ].map(({ field, placeholder }, index) => (
                    <div className="mb-3" key={index}>
                      <input
                        type={
                          field === "email"
                            ? "email"
                            : field === "password" ||
                              field === "confirmPassword"
                            ? "password"
                            : "text"
                        }
                        id={field}
                        name={field}
                        className="form-control"
                        placeholder={placeholder}
                        value={form[field]}
                        onChange={handleChange}
                      />
                      {errors[field] && (
                        <div className="form-text text-danger">
                          {errors[field]}
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-3"
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    Submit
                  </button>
                  {/* <div className="text-center mt-3">
                    <p className="mb-2" style={{ color: "#6E6D6D" }}>
                      Or
                    </p>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn m-2 btn-outline-danger d-flex align-items-center"
                      >
                        <FaGoogle className="mr-2" /> Google
                      </button>
                      <button
                        type="button"
                        className="btn m-2 btn-outline-primary d-flex align-items-center"
                      >
                        <FaFacebook className="mr-2" /> Facebook
                      </button>
                    </div>
                  </div> */}
                  <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/" className="text-primary">
                      <b>Sign In</b>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          ) : (
            <VerifyOtp email={form.email} />
          )}
        </div>
        <div className="col-lg-6 col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <div className="text-center">
            <h1
              style={{
                color: "#2E69FF",
                fontFamily: "Inknut Antiqua",
                fontSize: "42px",
              }}
            >
              Query <b>Quest</b>
            </h1>
            <p style={{ color: "#6E6D6D" }}>
              Join the Conversation, Share the Knowledge
            </p>
            <Lottie lottieRef={HomeAnimation} animationData={AnimationSignup} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
