import React, { useState } from 'react'
import PostService from '../appwrite/config'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Remove loading state even if there's an error
  };

  return (
    <Link to={`/post/${$id}`}>
    <div className="flex justify-center h-full">
      <div className="w-full border border-gray-700 bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] h-full flex flex-col">
          <div className="relative w-full pb-[56.25%]">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-800 flex justify-center items-center">
                  <div className="animate-pulse rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              )}
              
              
              {imageError ? (
                <div className="absolute inset-0 bg-gray-800 flex justify-center items-center">
                  <div className="text-gray-500 text-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>Image not available</p>
                  </div>
                </div>
              ) : (
                <img 
                    src={PostService.getFilePreview(featuredImage)} 
                    alt={title} 
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
              )}
          </div>
          <div className="p-4 flex flex-col gap-3 flex-grow">
              <h2 className="text-xl font-semibold text-white line-clamp-2 h-14">{title}</h2>
              <div className="flex justify-end mt-auto">
                      <Button onClick={() => navigate(`/post/${$id}`)} className="text-sm py-1 px-3">Read More</Button>
                  
              </div>
          </div>
      </div>
    </div>
    </Link>
  )
}

export default PostCard
