import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/404_found.json";

const ErrorPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <h3>
        <a href="/">Go to Home Page</a>
      </h3>
    </div>
  );
};

export default ErrorPage;
