import express from "express";
const router = express.Router();

import { signin, signup,  getUser, updateUser, deleteUser, followUser,  unFollowUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unFollowUser)

export default router;