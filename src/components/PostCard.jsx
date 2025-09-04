import React from 'react'
import PostService from '../appwrite/config'
import { Link } from 'react-router-dom'
import Button from './Button'
import { TiAttachment } from 'react-icons/ti'

const PostCard = ({$id, title, featuredImage}) => {
  return (

    <Link to={`/post/${$id}`}>
        <div className="border border-gray-300 rounded-md overflow-hidden p-1 w-80">
            <img src={PostService.getFilePreview(featuredImage)} alt={title} className='w-full h-64 object-cover object-center rounded-lg' />
            <div className="p-4 flex flex-col gap-1">
                <h2 className="text-lg font-semibold">{title}</h2>
                <Link to={`/post/${$id}`}>
                    <Button>Read More</Button>
                </Link>
            </div>
        </div>
    </Link>
  )
}

export default PostCard
