import crypto from "crypto";
import jwt from "jsonwebtoken";

// Utility Functions
const generateOTP = () => crypto.randomInt(1000, 9999).toString();
const generateResetToken = () => crypto.randomBytes(32).toString("hex");
const generateToken = (id, role, name) => {
  return jwt.sign({ id, role, name }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { generateOTP, generateResetToken, generateToken };
