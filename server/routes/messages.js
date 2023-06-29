import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createNewMessage,
  getMessageByConversationId,
} from "../controllers/messages.js";
const router = express.Router();

/* Create message */
router.post("/", verifyToken, createNewMessage);

// getmessagebyconvoID
router.get("/:conversationId", getMessageByConversationId);

export default router;
