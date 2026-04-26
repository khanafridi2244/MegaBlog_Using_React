import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-12 md:py-16 animate-fade-in-up'>
        <Container>
            <div className='max-w-5xl mx-auto'>
                <div className='mb-8'>
                    <h1 className='text-3xl md:text-4xl font-bold text-text-primary mb-2'>Create New Post</h1>
                    <p className='text-text-secondary'>Share your thoughts with the world</p>
                </div>
                <div className='bg-bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border'>
                    <PostForm />
                </div>
            </div>
        </Container>
    </div>
  )
}

export default AddPost

