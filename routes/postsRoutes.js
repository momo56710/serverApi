const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postsController.js');
const upload = require('../middleware/upload.js');

const router = express.Router();

// Route for creating post with image upload
router.post('/', upload.single('coverImage'), createPost);
router.get('/', getAllPosts);

module.exports = router;
