import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import AnimationOtp from "../../assets/animations/verify_otp.json";
import axiosInstance from "../Axios/AxiosInstance";

const VerifyOtp = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (!otpValue || otpValue.length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }
    try {
      const response = await axiosInstance.post("/api/auth/verify-otp", {
        email,
        otp: otpValue,
      });
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      setError(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axiosInstance.post("/api/auth/resend-otp", {
        email,
      });
      if (response.status === 200) {
        toast.success("OTP resent successfully");
        setTimeLeft(60);
        setIsResendDisabled(true);
      } else {
        toast.error(response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-lg-6 col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <div className="text-center">
            <h1 style={{ color: "#2E69FF", fontFamily: "Inknut Antiqua", fontSize: "42px" }}>
              Query <b>Quest</b>
            </h1>
            {/* <p style={{ color: "#6E6D6D" }}>
              Empowering Ideas, One Discussion at a Time
            </p> */}
            <Lottie animationData={AnimationOtp} style={{ width: "400px" }} />
          </div>
        </div>
        <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
          <div className="p-4" style={{ maxWidth: "450px" }}>
            <div className="text-center mb-4">
              <h2>Verify OTP</h2>
              <p>We have sent an OTP to <strong>{email}</strong></p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between mb-3">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className="form-control text-center mx-1"
                    style={{ width: "50px" }}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              {error && <div className="text-danger mb-3">{error}</div>}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={otp.join("").length !== 4}
              >
                Verify OTP
              </button>
            </form>
            <div className="text-center mt-3">
              <p>
                Didn't receive the OTP?{" "}
                <button
                  className="btn btn-link p-0"
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                >
                  Resend OTP ({timeLeft}s)
                </button>
              </p>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
