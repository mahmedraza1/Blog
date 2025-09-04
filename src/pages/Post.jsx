import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    if (slug) {
      PostService.getPost(slug).then((post) => {
        if (post) {
          console.log("Post data:", post);
          setPost(post);
        }
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    PostService.deletePost(post.$id).then((status) => {
      if (status) {
        PostService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-gray-900">
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        {/* Status indicator and action buttons row */}
        <div className="flex justify-between items-center w-full px-4">
          <div className="bg-black bg-opacity-50 text-white text-sm p-2 rounded-md">
            Status: {post.status}
          </div>
          
          {isAuthor && (
            <div className="flex flex-row gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="w-full max-w-4xl mx-auto mb-4">
          <div className="relative w-full pb-[56.25%]">
            <img
              src={PostService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg border-2 border-gray-700"
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="w-full mb-6 border-b border-gray-700 pb-4">
            <h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>
            <div className="text-gray-400 text-sm">
              {post.$createdAt ? `Posted on ${new Date(post.$createdAt).toLocaleDateString()}` : ''}
            </div>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
            {parse(post.content)}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
