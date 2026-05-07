import { userModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      res.status(400).json({
        msg: "User already exist",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      msg: "User created successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        msg: "User not found",
      });
      return;
    }
    const passwordValidation = await bcrypt.compare(password, user.password);
    if (!passwordValidation) {
      res.status(400).json({
        msg: "Password is incorrect",
      });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({
      msg: "Login successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};
