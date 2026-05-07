import { Router } from "express";
import scrapeHackerNews from "../scraper/hacker.news.js";

export const scraperRouter = Router();

scraperRouter.post("/", async (req, res) => {
  try {
    const stories = await scrapeHackerNews();
    res.status(200).json({
      message: "Scraping successful",
      count: stories.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Scraping failed", error });
  }
});
