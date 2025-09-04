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

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.$id} post={post} />
      ))}
    </div>
  );
};

export default AllPosts;
