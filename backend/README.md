# Web Scraper Backend

A Node.js + Express backend that scrapes Hacker News stories and provides a REST API with JWT authentication and bookmark functionality.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cheerio + Axios (scraping)

## Features

- Scrapes top 10 stories from Hacker News on server start
- JWT based register and login
- Get all stories sorted by points
- Bookmark and unbookmark stories
- Pagination support

## Setup

1. Clone the repo
2. Install dependencies
   npm install

3. Create .env file
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

4. Run the server
   npm run dev

## API Endpoints

| Method | Route                     | Auth | Description      |
| ------ | ------------------------- | ---- | ---------------- |
| POST   | /api/auth/register        | No   | Register user    |
| POST   | /api/auth/login           | No   | Login user       |
| GET    | /api/stories              | No   | Get all stories  |
| GET    | /api/stories/:id          | No   | Get single story |
| POST   | /api/stories/:id/bookmark | Yes  | Toggle bookmark  |
| GET    | /api/stories/bookmarks    | Yes  | Get my bookmarks |
| POST   | /api/scrape               | No   | Trigger scraper  |
