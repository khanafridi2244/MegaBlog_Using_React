import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage, thumbnail}) {

  // Use thumbnail if available, otherwise fall back to featuredImage
  const imageToShow = thumbnail || featuredImage;

  return (
    <Link to={`/post/${$id}`} className="block group">
        <div className='w-full bg-bg-card rounded-2xl p-4 shadow-card card-hover border border-border'>
            <div className='w-full justify-center mb-4 rounded-xl overflow-hidden bg-surface-hover'>
                {imageToShow ? (
                    <img
                        src={appwriteService.getFilePreview(imageToShow, 400, 300)}
                        alt={title}
                        className='rounded-xl w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105'
                        onError={(e) => {
                            e.target.onerror = null;
                            console.error('Image failed to load:', e.target.src);
                        }}
                    />
                ) : (
                    <div className='w-full h-48 bg-surface-hover rounded-xl flex items-center justify-center text-text-muted'>
                        <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>
            <h2 className='text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard

