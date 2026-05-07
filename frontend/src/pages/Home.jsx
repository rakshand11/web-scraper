import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../api/axios.js";
import StoryCard from "../components/StoryCard.jsx";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useAuth();

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/stories?page=${page}&limit=10`);
      setStories(res.data.stories);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [page]);

  const handleBookmark = async (storyId) => {
    if (!token) return alert("Please login to bookmark!");
    try {
      const res = await API.post(`/stories/${storyId}/bookmark`);
      setStories(
        stories.map((story) =>
          story._id === storyId
            ? { ...story, bookmarked: res.data.bookmarked }
            : story,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Hacker News Top Stories</h1>

      {stories.map((story) => (
        <StoryCard key={story._id} story={story} onBookmark={handleBookmark} />
      ))}

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
