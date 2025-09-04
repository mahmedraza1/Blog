import React, { useState, useEffect } from "react";
import PostService from "../appwrite/config";
import { PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const [posts, setPosts] = useState([]);
  const slug = useParams().slug;
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      PostService.getPosts(slug).then((post) => {
        if (post) {
          setPosts(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return posts ? (
    <div>
      <PostForm post={posts} />
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-center">No Post Found</h2>
    </div>
  );
};

export default EditPost;
