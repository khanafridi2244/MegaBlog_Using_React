# Fix Appwrite Image Display + Professional Theme - TODO

## Image Fix (COMPLETED)
- [x] Update `src/appwrite/config.js` - Add `getFileView`, update `getFilePreview` with optional dimensions
- [x] Update `src/components/PostCard.jsx` - Use `getFilePreview` with dimensions, add null check and `onError`
- [x] Update `src/pages/Post.jsx` - Use `getFileView`, add null check and `onError`
- [x] Update `src/components/post-form/PostForm.jsx` - Use `getFilePreview` with dimensions, add null check and `onError`
- [x] Add local thumbnail preview in PostForm when selecting a new image
- [ ] Verify bucket permissions in Appwrite Console

## Professional Theme (COMPLETED)
- [x] Create `src/index.css` - Centralized theme with custom colors, animations, and utilities
- [x] Update `src/App.jsx` - Clean flex layout with loading spinner
- [x] Update `src/App.css` - Clear old styles
- [x] Update `src/components/Logo.jsx` - Gradient text logo
- [x] Update `src/components/Button.jsx` - Gradient primary button with press effect
- [x] Update `src/components/Input.jsx` - Rounded inputs with ring focus
- [x] Update `src/components/Select.jsx` - Matching select styling
- [x] Update `src/components/RTE.jsx` - Matching label + better editor config
- [x] Update `src/components/AuthLayout.jsx` - Styled loading spinner
- [x] Update `src/components/Header/Header.jsx` - Glassmorphism sticky header
- [x] Update `src/components/Header/LogoutBtn.jsx` - Styled logout button
- [x] Update `src/components/Footer/Footer.jsx` - Dark themed multi-column footer
- [x] Update `src/components/PostCard.jsx` - Card hover effects, zoom image, skeleton placeholder
- [x] Update `src/components/login.jsx` - Centered card with theme
- [x] Update `src/components/Signup.jsx` - Centered card with theme
- [x] Update `src/pages/Home.jsx` - Hero section + featured post + recent posts grid
- [x] Update `src/pages/AllPosts.jsx` - Section header + grid layout
- [x] Update `src/pages/Post.jsx` - Hero image overlay + styled content
- [x] Update `src/pages/AddPost.jsx` - Section title + card wrapper
- [x] Update `src/pages/EditPost.jsx` - Section title + card wrapper
- [x] Update `src/components/post-form/PostForm.jsx` - Two-column layout with sidebar card

## Notes
- `getFilePreview` = for thumbnails (supports width/height transformations)
- `getFileView` = for direct file access (more reliable for full images)
- Bucket must allow public read access (either bucket-level or file-level permissions)
- Edit only `src/index.css` to change colors and animations globally

