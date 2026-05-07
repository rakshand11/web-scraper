import { useState, useEffect } from "react";
import API from "../api/axios.js";
import StoryCard from "../components/StoryCard.jsx";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/stories/bookmarks");
      setBookmarks(res.data);
    } catch (err) {
      setError("Failed to fetch bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleBookmark = async (storyId) => {
    try {
      await API.post(`/stories/${storyId}/bookmark`);
      setBookmarks(bookmarks.filter((story) => story._id !== storyId));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Loading bookmarks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet! Go bookmark some stories 🔖</p>
      ) : (
        bookmarks.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            onBookmark={handleBookmark}
          />
        ))
      )}
    </div>
  );
};

export default Bookmarks;
