import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-12 md:py-16 animate-fade-in-up'>
        <Container>
            <div className='max-w-5xl mx-auto'>
                <div className='mb-8'>
                    <h1 className='text-3xl md:text-4xl font-bold text-text-primary mb-2'>Edit Post</h1>
                    <p className='text-text-secondary'>Update your article</p>
                </div>
                <div className='bg-bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border'>
                    <PostForm post={post} />
                </div>
            </div>
        </Container>
    </div>
  ) : null
}

export default EditPost

