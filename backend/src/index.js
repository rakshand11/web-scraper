import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import scrapeHackerNews from "./scraper/hacker.news.js";
import { storyRouter } from "./routes/story.routes.js";
import { scraperRouter } from "./routes/scraper.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

const connectToDb = async () => {
  try {
    const mongoUrl = process.env.MONGO_URI;
    await mongoose.connect(mongoUrl);
    console.log("server is connected to database successfully");
    await scrapeHackerNews();
  } catch (error) {
    console.log("server is not connected to database", error);
    process.exit(1);
  }
};

connectToDb();

app.use("/api/auth", authRouter);
app.use("/api/stories", storyRouter);
app.use("/api/scrape", scraperRouter);

app.listen(PORT, () => {
  console.log(`server is connected to port ${PORT}`);
});
