import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookmarks: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
      default: [],
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model("User", userSchema);
