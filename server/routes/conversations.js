import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createConversation,
  getConversations,
} from "../controllers/conversations.js";
const router = express.Router();

/* Read Conversation */
// router.get("/", createConversation);
router.post("/", verifyToken, createConversation);
router.get("/:userId", verifyToken, getConversations);

export default router;
