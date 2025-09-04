import React from 'react'
import PostService from '../appwrite/config'
import { Link } from 'react-router-dom'
import Button from './Button'
import { TiAttachment } from 'react-icons/ti'

const PostCard = ({$id, title, featuredImage}) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm border border-gray-700 bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
          <div className="relative w-full pb-[56.25%]">
              <img 
                  src={PostService.getFilePreview(featuredImage)} 
                  alt={title} 
                  className="absolute inset-0 w-full h-full object-cover object-center"
              />
          </div>
          <div className="p-4 flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-white line-clamp-2 h-14">{title}</h2>
              <div className="flex justify-end mt-2">
                  <Link to={`/post/${$id}`}>
                      <Button className="text-sm py-1 px-3">Read More</Button>
                  </Link>
              </div>
          </div>
      </div>
    </div>
  )
}

export default PostCard
