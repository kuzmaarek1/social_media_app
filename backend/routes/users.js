import express from "express";
import { signin, signup, getUser, getAllUser, updateUser, deleteUser, followUser,  unFollowUser, signinWithGoogle } from "../controllers/user.js";
import auth  from '../middleware/index.js'

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signinWithGoogle", signinWithGoogle)

router.get('/', getAllUser)
router.get('/:id', getUser)
router.patch('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)
router.patch('/:id/follow', auth, followUser)
router.patch('/:id/unfollow', auth, unFollowUser)

export default router;