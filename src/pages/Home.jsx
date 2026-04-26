import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { Link } from 'react-router-dom';

// Fixed hero background image - single consistent image for the read article section
const HERO_BG_IMAGE = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&h=800&fit=crop";

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-20 text-center animate-fade-in">
                <Container>
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                            <svg className="w-20 h-20 mx-auto text-text-muted opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-text-primary mb-4">
                            No posts yet
                        </h1>
                        <p className="text-text-secondary mb-8 text-lg">
                            Be the first to share your story with the world.
                        </p>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-hover transition-colors"
                        >
                            Login to get started
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }

    const featuredPost = posts[0];
    const recentPosts = posts.slice(1);

    return (
        <div className='w-full animate-fade-in'>
            {/* Hero Section - Fixed background image */}
            {featuredPost && (
                <section className='relative text-white overflow-hidden min-h-[70vh] flex items-center'>
                    {/* Background Image - Single fixed image */}
                    <div className='absolute inset-0'>
                        <img
                            src={HERO_BG_IMAGE}
                            alt=""
                            className='w-full h-full object-cover'
                        />
                        {/* Dark overlay for text readability */}
                        <div className='absolute inset-0 bg-bg-dark/70'></div>
                        <div className='absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/40'></div>
                    </div>
                    <Container>
                        <div className='relative py-20 md:py-28 max-w-3xl'>
                            <span className='inline-block px-4 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-6 backdrop-blur-md border border-white/20'>
                                Featured Post
                            </span>
                            <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg'>
                                {featuredPost.title}
                            </h1>
                            <Link
                                to={`/post/${featuredPost.$id}`}
                                className='inline-flex items-center gap-2 bg-white text-bg-dark px-8 py-3.5 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl'
                            >
                                Read Article
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </Container>
                </section>
            )}

            {/* Recent Posts */}
            <section className='py-16'>
                <Container>
                    <div className='flex items-center justify-between mb-10'>
                        <div>
                            <h2 className='text-2xl md:text-3xl font-bold text-text-primary'>Recent Posts</h2>
                            <p className='text-text-secondary mt-1'>Discover the latest stories</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {recentPosts.map((post, index) => (
                            <div
                                key={post.$id}
                                className='animate-fade-in-up'
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Home

