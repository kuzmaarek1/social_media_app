import express from "express";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from "../controllers/post.js";

const router = express.Router()

router.post('/', createPost)
router.get('/:id', getPost)
router.patch('/:id', updatePost)
router.delete("/:id", deletePost)
router.patch("/:id/like", likePost)
router.get("/:id/timeline", getTimelinePosts)

export default router;