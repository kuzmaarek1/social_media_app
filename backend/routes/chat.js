import express from "express";
import auth from '../middleware/index.js'
import { createChat, userChats, findChat } from "../controllers/chat.js";

const router = express.Router()

router.post('/', auth, createChat)
router.get('/:userId', auth, userChats)
router.get('/find/:firstId/:secondId', auth, findChat)

export default router;