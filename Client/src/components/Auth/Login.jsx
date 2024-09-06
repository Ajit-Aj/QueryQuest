import React, { useRef, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Lottie from "lottie-react";
import axiosInstance from "../Axios/AxiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import AnimationSignin from "../../assets/animations/login.json";
import { Link } from "react-router-dom";
import { decodeToken } from "../../utils/parseJwt";

const Login = () => {
  const { setAuthInfo } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const LoginAnimation = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email && form.password) {
      try {
        const response = await axiosInstance.post("/api/auth/signin", form);

        if (response.status === 200) {
          const { role, token } = response.data;
          toast.success("Signed in successfully");
          setAuthInfo({ token });

          const decodedToken = decodeToken(token);
          if (decodedToken.role === "user") {
            setTimeout(() => {
              navigate("/user");
            }, 1800);
          } else if (decodedToken.role === "admin") {
            setTimeout(() => {
              navigate("/admin");
            }, 1800);
          }

          setForm({ email: "", password: "" });
          setErrors({});
        } else {
          toast.error("Signin failed");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          toast.error("Account is disabled. Please contact support.");
        } else {
          toast.error("Signin failed");
        }
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="vh-100 d-flex">
      <div className="row w-100 h-100 no-gutters">
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
              Empowering Ideas, One Discussion at a Time
            </p>
            <Lottie
              style={{ height: "500px" }}
              lottieRef={LoginAnimation}
              animationData={AnimationSignin}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
          <div
            style={{ borderStyle: "none" }}
            className="card shadow-lg py-3 mt-5 bg-white"
          >
            <div className="card-body">
              <h2
                className="text-center mb-4"
                style={{ color: "#2E69FF", fontWeight: "bold" }}
              >
                Sign in
              </h2>
              <h6 className="text-center mb-4">
                Welcome back! Please login to your account.
              </h6>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      style={{ borderRight: "none", paddingRight: "2.5rem" }}
                    />
                    <div
                      className="input-group-append"
                      style={{
                        position: "absolute",
                        right: "0px",
                        height: "100%",
                      }}
                    >
                      <span
                        className="input-group-text password-icon"
                        onClick={togglePasswordVisibility}
                        style={{
                          cursor: "pointer",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>

                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Link to="/forgotpassword" className="text-primary">
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block col-12"
                >
                  Submit
                </button>
              </form>
              <div className="text-center mt-3">
                <h6>Or</h6>
                <button className="btn btn-outline-danger btn-block">
                  <FaGoogle className="mr-2" /> Google
                </button>
                &emsp;
                <button className="btn btn-outline-primary btn-block">
                  <FaFacebook className="mr-2" /> Facebook
                </button>
              </div>
              <h6 className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  <b>Sign Up</b>
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
