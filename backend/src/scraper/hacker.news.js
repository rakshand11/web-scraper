import axios from "axios";
import * as cheerio from "cheerio";
import { storyModel } from "../model/story.model.js";

const scrapeHackerNews = async () => {
  try {
    console.log("Scraping Hacker News...");

    const { data } = await axios.get("https://news.ycombinator.com");
    const $ = cheerio.load(data);

    const stories = [];

    $(".athing")
      .slice(0, 10)
      .each((i, el) => {
        const titleEl = $(el).find(".titleline > a");
        const title = titleEl.text();
        const url = titleEl.attr("href");

        const subtext = $(el).next().find(".subtext");
        const points = parseInt(subtext.find(".score").text()) || 0;
        const author = subtext.find(".hnuser").text() || "unknown";
        const postedAt = subtext.find(".age").attr("title") || "unknown";

        if (title) {
          stories.push({ title, url, points, author, postedAt });
        }
      });

    for (const story of stories) {
      await storyModel.findOneAndUpdate({ title: story.title }, story, {
        upsert: true,
        new: true,
      });
    }

    console.log(`Scraped ${stories.length} stories!`);
    return stories;
  } catch (error) {
    console.log("Scraping failed", error);
    throw error;
  }
};

export default scrapeHackerNews;
