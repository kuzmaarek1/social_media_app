import express from "express";
import auth from '../middleware/index.js'
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from "../controllers/post.js";

const router = express.Router()

router.post('/', auth, createPost)
router.get('/:id', auth, getPost)
router.patch('/:id', auth, updatePost)
router.delete("/:id", auth, deletePost)
router.patch("/:id/like", auth, likePost)
router.get("/:id/timeline",auth, getTimelinePosts)

export default router;