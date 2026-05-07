import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectToDb = async (req, res) => {
  try {
    const mongoUrl = process.env.MONGO_URI;
    await mongoose.connect(mongoUrl);
    console.log("server is connected to database successfully");
  } catch (error) {
    console.log("server is not connected to database", error);
  }
};
connectToDb();
app.use(express.json());
app.listen(PORT, () => {
  console.log(`server is connected to port ${PORT}`);
});
