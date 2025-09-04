import React from "react";
import { PostForm } from "../components";

const AddPost = () => {
  return (
    <div className="lg:my-8 lg:w-7xl mx-auto lg:p-6 p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Add New Post</h2>
      <PostForm />
    </div>
  );
};

export default AddPost;
    