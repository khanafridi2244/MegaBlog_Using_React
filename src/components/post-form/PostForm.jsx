import React, { useCallback, useState, useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { Button, Input, RTE, Select, Thumbnail } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const methods = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const { register, handleSubmit, watch, setValue, control, getValues } = methods;

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Preview state for featured image only
    const [featuredPreview, setFeaturedPreview] = useState(null);

    const selectedFeatured = watch("image");
    const watchedTitle = useWatch({ control, name: "title" });

    const submit = async (data) => {
        if (post) {
            // Upload new featured image if selected
            const featuredFile = data.image[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;

            if (featuredFile && post.featuredImage) {
                appwriteService.deleteFile(post.featuredImage);
            }

            // Upload new thumbnail if selected
            const thumbFile = data.thumbnail[0]
                ? await appwriteService.uploadFile(data.thumbnail[0])
                : null;

            if (thumbFile && post.thumbnail) {
                appwriteService.deleteFile(post.thumbnail);
            }

            const newFeaturedId = featuredFile ? featuredFile.$id : post.featuredImage;
            // Use separate thumbnail if uploaded, otherwise fallback to existing thumbnail, otherwise fallback to featured image
            let newThumbnailId = thumbFile ? thumbFile.$id : post.thumbnail;
            if (!newThumbnailId && newFeaturedId) {
                newThumbnailId = newFeaturedId;
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: newFeaturedId,
                thumbnail: newThumbnailId,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // Create new post
            const featuredFile = data.image[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;

            const thumbFile = data.thumbnail[0]
                ? await appwriteService.uploadFile(data.thumbnail[0])
                : null;

            if (featuredFile) {
                data.featuredImage = featuredFile.$id;
            }
            // Use separate thumbnail if uploaded, otherwise fallback to featured image
            data.thumbnail = thumbFile
                ? thumbFile.$id
                : (featuredFile ? featuredFile.$id : undefined);

            const dbPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
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

    // Featured image preview
    useEffect(() => {
        if (selectedFeatured && selectedFeatured[0]) {
            const url = URL.createObjectURL(selectedFeatured[0]);
            setFeaturedPreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setFeaturedPreview(null);
        }
    }, [selectedFeatured]);

    useEffect(() => {
        if (watchedTitle !== undefined && watchedTitle !== null) {
            setValue("slug", slugTransform(watchedTitle), { shouldValidate: true });
        }
    }, [watchedTitle, slugTransform, setValue]);

    return (
        <FormProvider {...methods}>
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
                        {/* Featured Image Upload */}
                        <Input
                            label="Featured Image (Hero)"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        {featuredPreview && (
                            <div className="w-full">
                                <p className="text-sm text-text-secondary mb-2 font-medium">New Featured Preview:</p>
                                <img
                                    src={featuredPreview}
                                    alt="Featured preview"
                                    className="rounded-xl w-full h-48 object-cover border border-border"
                                />
                            </div>
                        )}
                        {post && post.featuredImage && !featuredPreview && (
                            <div className="w-full">
                                <p className="text-sm text-text-secondary mb-2 font-medium">Current Featured:</p>
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage, 400, 300)}
                                    alt={post.title}
                                    className="rounded-xl w-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        console.error('Featured image failed to load:', e.target.src);
                                    }}
                                />
                            </div>
                        )}

                        {/* Thumbnail Component */}
                        <Thumbnail post={post} />

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
        </FormProvider>
    );
}

