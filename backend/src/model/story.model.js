import mongoose, { Schema } from "mongoose";

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    postedAt: {
      type: String,
      required: true,
    },
    scrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const storyModel = mongoose.model("Story", storySchema);
