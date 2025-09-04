import React, { useState, useEffect } from "react";
import { PostForm } from "../components";
import PostService from "../appwrite/config";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await PostService.getPosts();
      setPosts(posts.documents);
    };
    fetchPosts();
  }, []);

  return posts.length ? (
    <div>
      {posts.map((post) => (
        <PostCard key={post.$id} post={post} />
      ))}
    </div>
  ) : (
    <div className="text-center text-gray-400">
      <h2 className="text-2xl font-semibold">No posts available</h2>
    </div>
  );
};

export default AllPosts;
