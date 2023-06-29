// import Post from "../models/Post.js";
import User from "../models/User.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

/* CREATE */
export const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    const conversation = await Conversation.find();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(409).json({ message: err.message });
  }
};

/* Read conversations of a user */

export const getConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    // const conversation = await Conversation.find({ userId });
    const conversation = await Conversation.find({ members: { $in: userId } });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};
