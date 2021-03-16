import express from 'express';

import { 
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost
} from '../controllers/posts.js';

import auth from '../middleware/auth.js'


const router = express.Router();

    // 🔐 Routes that can be visited by not logged in users

        // GET -> http://localhost:5000/posts                   200 | 404
        router.get('/', getPosts);

        // GET -> http://localhost:5000/posts/12                200 | 404
        router.get('/:id', getPost);

    // 🔒 Routes that need auth -> User need to be logged in!

        // POST -> http://localhost:5000/posts                  201 | 409
        router.post('/', auth, createPost);

        // PATCH -> http://localhost:5000/posts/12
        router.patch('/:id', auth, updatePost);

        // DELETE -> http://localhost:5000/posts/12
        router.delete('/:id', auth, deletePost);

        // PATCH -> http://localhost:5000/posts/12/likePost
        router.patch('/:id/likePost', auth, likePost);

export default router;