import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {});
    // const conn = await mongoose.connect(
    //   "mongodb+srv://queryquest777:zW96mR9uRLQ3QVWi@queryquest.3repe.mongodb.net/?retryWrites=true&w=majority&appName=queryquest"
    // );
    console.log(`MongoDB connected: ${conn.connection.host}  `);
    // console.log(`MongoDB connected: ${conn.connection.host}  `);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectdb;
