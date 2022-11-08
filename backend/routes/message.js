import express from "express";
import auth from '../middleware/index.js'
import { addMessage, getMassages } from "../controllers/message.js";

const router = express.Router()

router.post('/', auth, addMessage)
router.get('/:chatId', auth, getMassages)

export default router;