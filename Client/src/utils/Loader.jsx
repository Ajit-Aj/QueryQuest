import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/animations/loading_lottie.json";

const loaderStyles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: semi-transparent background
    zIndex: 9999, // Ensure it stays on top of other content
  },
  lottie: {
    width: "auto", // Adjust width as needed
    height: "auto", // Adjust height as needed
  },
};

const Loader = () => {
  return (
    <div style={loaderStyles.wrapper}>
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        autoplay={true}
        style={loaderStyles.lottie}
      />
    </div>
  );
};

export default Loader;
