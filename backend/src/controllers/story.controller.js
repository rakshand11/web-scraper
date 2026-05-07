import { storyModel } from "../model/story.model.js";
import { userModel } from "../model/user.model.js";

export const getAllStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stories = await storyModel
      .find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    const total = await storyModel.countDocuments();

    res.status(200).json({
      stories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSingleStory = async (req, res) => {
  try {
    const story = await storyModel.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const storyId = req.params.id;

    const story = await storyModel.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    const user = await userModel.findById(userId);
    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Bookmark removed", bookmarked: false });
    } else {
      user.bookmarks.push(storyId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Bookmark added", bookmarked: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).populate("bookmarks");
    res.status(200).json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
