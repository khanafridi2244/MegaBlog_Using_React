import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                // Delete both featured image and thumbnail
                if (post.featuredImage) {
                    appwriteService.deleteFile(post.featuredImage);
                }
                if (post.thumbnail) {
                    appwriteService.deleteFile(post.thumbnail);
                }
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="animate-fade-in">
            {/* Hero Image Section - Uses the user's uploaded featured image as background */}
            <div className="w-full relative bg-bg-dark overflow-hidden">
                {post.featuredImage ? (
                    <>
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-[50vh] md:h-[60vh] object-cover opacity-40"
                            onError={(e) => {
                                e.target.onerror = null;
                                console.error('Image failed to load:', e.target.src);
                            }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-bg-dark/60 to-transparent"></div>
                    </>
                ) : (
                    <div className="w-full h-[50vh] md:h-[60vh] bg-surface-hover"></div>
                )}
                <Container>
                    <div className="absolute bottom-0 left-0 right-0 pb-12 md:pb-16">
                        <div className="max-w-4xl">
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                                {post.title}
                            </h1>
                            {isAuthor && (
                                <div className="flex gap-3">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button className="px-5! py-2! text-sm! rounded-lg!">
                                            Edit Post
                                        </Button>
                                    </Link>
                                    <Button
                                        bgColor="bg-danger"
                                        className="px-5! py-2! text-sm! rounded-lg!"
                                        onClick={deletePost}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>

            {/* Content Section */}
            <Container>
                <div className="max-w-3xl mx-auto py-12 md:py-16">
                    <article className="prose prose-lg prose-slate max-w-none">
                        <div className="text-text-primary leading-relaxed text-lg">
                            {parse(post.content)}
                        </div>
                    </article>
                </div>
            </Container>
        </div>
    ) : null;
}

