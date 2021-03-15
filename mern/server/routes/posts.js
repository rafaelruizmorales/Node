import express from 'express';

import { 
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost
} from '../controllers/posts.js';


const router = express.Router();

    // GET -> http://localhost:5000/posts                   200 | 404
    router.get('/', getPosts);

    // GET -> http://localhost:5000/posts/12                200 | 404
    router.get('/:id', getPost);

    // POST -> http://localhost:5000/posts                  201 | 409
    router.post('/', createPost);

    // PATCH -> http://localhost:5000/posts/12
    router.patch('/:id', updatePost);

    // DELETE -> http://localhost:5000/posts/12
    router.delete('/:id', deletePost);

    // PATCH -> http://localhost:5000/posts/12/likePost
    router.patch('/:id/likePost', likePost);

export default router;