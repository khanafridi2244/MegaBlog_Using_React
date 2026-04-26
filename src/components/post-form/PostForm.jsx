import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [previewUrl, setPreviewUrl] = useState(null);

    const selectedImage = watch("image");

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    // Generate local thumbnail preview when a new file is selected
    useEffect(() => {
        if (selectedImage && selectedImage[0]) {
            const url = URL.createObjectURL(selectedImage[0]);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [selectedImage]);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
            <div className="w-full lg:w-2/3 px-2">
                <div className="space-y-5">
                    <Input
                        label="Title"
                        placeholder="Enter post title"
                        className="mb-0"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug"
                        placeholder="post-url-slug"
                        className="mb-0"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <div>
                        <label className="inline-block mb-2 pl-1 text-sm font-medium text-text-secondary">
                            Content
                        </label>
                        <RTE name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/3 px-2 mt-6 lg:mt-0">
                <div className="bg-surface-hover rounded-xl p-5 space-y-5 border border-border">
                    <Input
                        label="Featured Image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {previewUrl && (
                        <div className="w-full">
                            <p className="text-sm text-text-secondary mb-2 font-medium">New Image Preview:</p>
                            <img
                                src={previewUrl}
                                alt="Selected thumbnail"
                                className="rounded-xl w-full h-48 object-cover border border-border"
                            />
                        </div>
                    )}
                    {post && post.featuredImage && !previewUrl && (
                        <div className="w-full">
                            <p className="text-sm text-text-secondary mb-2 font-medium">Current Image:</p>
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage, 400, 300)}
                                alt={post.title}
                                className="rounded-xl w-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        {...register("status", { required: true })}
                    />
                    <Button
                        type="submit"
                        bgColor={post ? "bg-success" : undefined}
                        className="w-full"
                    >
                        {post ? "Update Post" : "Publish Post"}
                    </Button>
                </div>
            </div>
        </form>
    );
}

