import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';


/*
    Useful MongoDB functions

    .find()
    .findById(id);
    .save();
    .findByIdAndUpdate(id, updatedPost, { new: true });
    .findByIdAndRemove(id);

    mongoose.Types.ObjectId.isValid(id)

    HTTP VERBS
    https://www.restapitutorial.com/httpstatuscodes.html

*/ 

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    // We can use req.userId since this route uses the auth middleware and we defined req.userId there
    if (!req.userId) {
        return res.json({ message: "User not authenticated" });
    }

    const newPostMessage = new PostMessage(post);

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    // We can use req.userId since this route uses the auth middleware and we defined req.userId there
    if (!req.userId) {
        return res.json({ message: "User not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`No post with id: ${_id}`);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
        _id,
        post,
        { new: true }
    );

    res.status(200).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    // We can use req.userId since this route uses the auth middleware and we defined req.userId there
    if (!req.userId) {
        return res.json({ message: "User not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    await PostMessage.findByIdAndRemove(id);

    res.status(200).json({"status": `post ${id} deleted successfully`});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    // We can use req.userId since this route uses the auth middleware and we defined req.userId there
    if (!req.userId) {
        return res.json({ message: "User not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    try {
        const post = await PostMessage.findById(id);

        // To avoid users like the same post more than once and be able to add/remove likes
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter( id => 
                id !== String(req.userId)
            );
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(
            id,
            post,
            { new: true }
        );
        
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}   