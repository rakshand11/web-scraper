import { useAuth } from "../context/AuthContext.jsx";

const StoryCard = ({ story, onBookmark }) => {
  const { token } = useAuth();

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}
    >
      <h3>
        <a href={story.url} target="_blank" rel="noreferrer">
          {story.title}
        </a>
      </h3>
      <p>
        {story.points} points | 👤 {story.author} | {story.postedAt}
      </p>
      <button onClick={() => onBookmark(story._id)}>
        {story.bookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
      </button>
    </div>
  );
};

export default StoryCard;
