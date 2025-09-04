import React from "react";
import { PostForm } from "../components";

const AddPost = () => {
  return (
    <div className="my-8 w-7xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Add New Post</h2>
      <PostForm />
    </div>
  );
};

export default AddPost;
    