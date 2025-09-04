import React, { useState, useEffect } from "react";
import PostService from "../appwrite/config";
import { PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      PostService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          // Ensure the slug property exists
          if (!fetchedPost.slug) {
            fetchedPost.slug = fetchedPost.$id;
          }
          setPost(fetchedPost);
        } else {
          navigate("/");
        }
      }).catch(error => {
        console.error("Error fetching post for editing:", error);
        navigate("/");
      });
    }
  }, [slug, navigate]);

  return (
    <div className="py-8 bg-gray-900">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Edit Post</h1>
        {post ? (
          <PostForm post={post} />
        ) : (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
