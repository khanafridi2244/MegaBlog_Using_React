import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  return (
    <div className='w-full py-16 animate-fade-in'>
        <Container>
            <div className='mb-10'>
                <h1 className='text-3xl md:text-4xl font-bold text-text-primary mb-2'>All Posts</h1>
                <p className='text-text-secondary'>Browse through all our published articles</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {posts.map((post, index) => (
                    <div
                        key={post.$id}
                        className='animate-fade-in-up'
                        style={{ animationDelay: `${index * 80}ms` }}
                    >
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            {posts.length === 0 && (
                <div className='text-center py-20'>
                    <p className='text-text-muted text-lg'>No posts found.</p>
                </div>
            )}
        </Container>
    </div>
  )
}

export default AllPosts

