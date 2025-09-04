import React, { useState, useEffect } from "react";
import { PostCard } from "../components";
import PostService from "../appwrite/config";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await PostService.getPosts();
        if (posts && posts.documents) {
          setPosts(posts.documents);
        } else {
          console.error("No documents property in posts response");
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-8 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">All Posts</h1>
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-400">Loading posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">All Posts</h1>
          <div className="flex justify-center items-center h-64">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 max-w-md">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return posts.length ? (
    <div className="py-8 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">All Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="py-8 bg-gray-900 min-h-screen flex items-center justify-center text-center text-gray-400">
      <h2 className="text-2xl font-semibold">No posts available</h2>
    </div>
  );
};

export default AllPosts;
