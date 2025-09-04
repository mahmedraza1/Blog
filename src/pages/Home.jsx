import React, { useEffect, useState } from "react";
import PostService from "../appwrite/config";
import { PostCard } from "../components";
import { Link } from "react-router-dom";

function Home() {
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
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full py-8 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to My Blog</h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8">Stay tuned for amazing content</p>
          </div>
          
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-400">Loading latest posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full py-8 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to My Blog</h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8">Stay tuned for amazing content</p>
          </div>
          
          <div className="flex justify-center items-center h-64">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 max-w-md">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No posts state
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to My Blog</h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8">Stay tuned for amazing content</p>
          </div>
          
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold text-gray-500 mb-4">No posts available yet</h2>
            <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-all">
              Login to create posts
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Posts loaded successfully
  return (
    <div className="w-full py-8 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center my-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to My Blog</h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8">Stay tuned for amazing content</p>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-6 px-4">Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="w-full px-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
