import React, { useState, useEffect } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox";
import db from "./firebase";
import Post from "./Post";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => doc.data())) 
       //we can pull doc.id and use it as the id instead of text
    );
  }, []);
  return (
    <div className="feed">
      {/* Header */}
      <div className="feed__header">
        <h2> Home</h2>
      </div>

      {/* Tweet Box */}
      <TweetBox />

      {/* Post */}
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.text}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
