import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      PostService.getPost(slug)
        .then((post) => {
          if (post) {
            console.log("Post data:", post);
            setPost(post);
          } else {
            setError("Post not found");
            setTimeout(() => navigate("/"), 2000);
          }
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
          setError("Failed to load post. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    PostService.deletePost(post.$id).then((status) => {
      if (status) {
        PostService.deleteFile(post.featuredImage);
        navigate("/");
      } else {
        setIsDeleting(false);
        setShowDeleteConfirm(false);
      }
    }).catch(error => {
      console.error("Error deleting post:", error);
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    });
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="py-8 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-400">Loading post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <div className="py-8 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 max-w-md">
              <p className="text-red-400 text-center">{error}</p>
              <div className="flex justify-center mt-4">
                <Link to="/">
                  <Button bgColor="bg-gray-700">Return to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return post ? (
    <div className="py-8 bg-gray-900 min-h-screen">
      <div className="flex flex-col gap-4 max-w-5xl mx-auto px-4">
        {/* Status indicator and action buttons row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0">
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
              <Button bgColor="bg-red-500" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="w-full mx-auto mb-4">
          <div className="relative w-full pb-[56.25%]">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800 flex justify-center items-center rounded-lg">
                <div className="animate-pulse rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            )}
            <img
              src={PostService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className={`absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg border-2 border-gray-700 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
        </div>
        <div className="mx-auto px-4 py-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="w-full mb-6 border-b border-gray-700 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{post.title}</h1>
            <div className="text-gray-400 text-sm">
              {post.$createdAt ? `Posted on ${new Date(post.$createdAt).toLocaleDateString()}` : ''}
            </div>
          </div>
          
          <div className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-300 leading-relaxed overflow-hidden">
            {parse(post.content)}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 mb-4">
          <Link to="/" className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg transition-all">
            ← Back to all posts
          </Link>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-gray-700 animate-fadeIn">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
            </div>
            
            <p className="text-gray-300 mb-6 pl-14">
              Are you sure you want to delete "<span className="font-semibold text-white">{post.title}</span>"? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-4">
              <Button 
                bgColor="bg-gray-700" 
                textColor="text-gray-200"
                className="hover:bg-gray-600"
                onClick={cancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                bgColor="bg-red-600" 
                className="hover:bg-red-700"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : "Delete Post"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
