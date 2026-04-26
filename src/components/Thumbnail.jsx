import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import appwriteService from "../appwrite/config";

/**
 * Thumbnail Component
 * Handles thumbnail image upload, preview, and displaying existing thumbnails.
 * To be used inside a react-hook-form FormProvider.
 */
export default function Thumbnail({ post, registerName = "thumbnail" }) {
    const { register } = useFormContext();
    const [preview, setPreview] = useState(null);
    const urlRef = useRef(null);

    const registered = register(registerName, { required: false });
    const originalOnChange = registered.onChange;

    const handleChange = (e) => {
        // Inform react-hook-form
        originalOnChange(e);

        // Revoke previous object URL
        if (urlRef.current) {
            URL.revokeObjectURL(urlRef.current);
            urlRef.current = null;
        }

        const file = e.target.files?.[0];
        if (file) {
            urlRef.current = URL.createObjectURL(file);
            setPreview(urlRef.current);
        } else {
            setPreview(null);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (urlRef.current) {
                URL.revokeObjectURL(urlRef.current);
            }
        };
    }, []);

    return (
        <div className="w-full space-y-3">
            {/* File Input */}
            <div>
                <label className="inline-block mb-2 pl-1 text-sm font-medium text-text-secondary">
                    Thumbnail (Card Preview) — <span className="text-text-muted font-normal">optional, post image will be used by default</span>
                </label>
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="px-4 py-3 rounded-xl bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary border border-border w-full transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    {...registered}
                    onChange={handleChange}
                />
            </div>

            {/* New Thumbnail Preview */}
            {preview && (
                <div className="w-full">
                    <p className="text-sm text-text-secondary mb-2 font-medium">New Thumbnail Preview:</p>
                    <img
                        src={preview}
                        alt="Thumbnail preview"
                        className="rounded-xl w-full h-32 object-cover border border-border"
                    />
                </div>
            )}

            {/* Existing Thumbnail Display */}
            {post && post.thumbnail && !preview && (
                <div className="w-full">
                    <p className="text-sm text-text-secondary mb-2 font-medium">Current Thumbnail:</p>
                    <img
                        src={appwriteService.getFilePreview(post.thumbnail, 400, 300)}
                        alt="Thumbnail"
                        className="rounded-xl w-full h-32 object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            console.error('Thumbnail failed to load:', e.target.src);
                        }}
                    />
                </div>
            )}

            {/* Note about featured image fallback */}
            {(!post || !post.thumbnail) && !preview && (
                <p className="text-xs text-text-muted">
                    If no thumbnail is uploaded, the featured image will automatically be used as the thumbnail.
                </p>
            )}
        </div>
    );
}

