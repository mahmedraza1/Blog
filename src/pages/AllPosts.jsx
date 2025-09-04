import React, { useState, useEffect } from "react";
import { PostCard } from "../components";
import PostService from "../appwrite/config";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await PostService.getPosts();
        console.log("Posts fetched:", posts);
        if (posts && posts.documents) {
          setPosts(posts.documents);
        } else {
          console.error("No documents property in posts response");
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  return posts.length ? (
    <div className="py-8 bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">All Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard 
              key={post.$id} 
              $id={post.$id} 
              title={post.title} 
              featuredImage={post.featuredImage}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-center text-gray-400">
      <h2 className="text-2xl font-semibold">No posts available</h2>
    </div>
  );
};

export default AllPosts;
