# Web Scraper Frontend

A React frontend that displays Hacker News stories with authentication and bookmark functionality.

## Tech Stack

- React.js
- React Router DOM
- Axios
- Context API

## Features

- View top 10 Hacker News stories
- Register and login
- Bookmark and unbookmark stories
- Protected bookmarks page
- Pagination

## Setup

1. Clone the repo
2. Install dependencies
   npm install

3. Create .env file
   VITE_API_URL=http://localhost:3000/api

4. Run the app
   npm run dev

## Pages

| Page      | Route      | Auth Required |
| --------- | ---------- | ------------- |
| Home      | /          | No            |
| Login     | /login     | No            |
| Register  | /register  | No            |
| Bookmarks | /bookmarks | Yes           |
