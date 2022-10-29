import express from "express";
import { signin, signup,  getUser, updateUser, deleteUser, followUser,  unFollowUser } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.patch('/:id/follow', followUser)
router.patch('/:id/unfollow', unFollowUser)

export default router;