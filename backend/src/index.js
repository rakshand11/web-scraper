import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.routes.js";
import scrapeHackerNews from "./scraper/hacker.news.js";
import { storyRouter } from "./routes/story.routes.js";
import { scraperRouter } from "./routes/scraper.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectToDb = async () => {
  try {
    const mongoUrl = process.env.MONGO_URI;
    await mongoose.connect(mongoUrl);
    console.log("server is connected to database successfully");
    await scrapeHackerNews();
  } catch (error) {
    console.log("server is not connected to database", error);
  }
};
connectToDb();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/stories", storyRouter);
app.use("/api/scrape", scraperRouter);
app.listen(PORT, () => {
  console.log(`server is connected to port ${PORT}`);
});
