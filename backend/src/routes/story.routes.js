import { Router } from "express";
import {
  getAllStories,
  getBookmarks,
  getSingleStory,
  toggleBookmark,
} from "../controllers/story.controller.js";
import { authMiddleware } from "../middleware/middleware.js";

export const storyRouter = Router();

storyRouter.get("/", getAllStories);
storyRouter.get("/bookmarks", authMiddleware, getBookmarks);
storyRouter.get("/:id", getSingleStory);
storyRouter.post("/:id/bookmark", authMiddleware, toggleBookmark);
