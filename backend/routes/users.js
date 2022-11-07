import express from "express";
import { signin, signup, getUser, getAllUser, updateUser, deleteUser, followUser,  unFollowUser, signinWithGoogle } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signinWithGoogle", signinWithGoogle)

router.get('/', getAllUser)
router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.patch('/:id/follow', followUser)
router.patch('/:id/unfollow', unFollowUser)

export default router;