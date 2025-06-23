const Post = require('../models/post.js'); // Use require instead of import

const createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const coverImage = req.file ? req.file.path : null; // Get the uploaded file path

        if (!title || !body) {
            return res.status(400).json({ message: 'Title and body are required' });
        }

        const newPost = await Post.create({
            title,
            body,
            coverImage
        });

        res.status(201).json({
            success: true,
            data: {
                ...newPost.toObject(),
                coverImageUrl: coverImage ? `${req.protocol}://${req.get('host')}/${coverImage}` : null
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating post',
            error: error.message
        });
    }
};

// Get all posts with full image URLs
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        
        const postsWithImageUrls = posts.map(post => ({
            ...post.toObject(),
            coverImageUrl: post.coverImage ? `${post.coverImage.replace('\\' , '/')}` : null
        }));

        res.status(200).json({
            success: true,
            data: postsWithImageUrls
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching posts',
            error: error.message
        });
    }
};

module.exports = { createPost, getAllPosts }; // Use module.exports
