import Message from "../models/Message.js";

/* Create / Adding new Messages */

export const createNewMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    const NewMessage = new Message({
      conversationId: conversationId,
      sender: sender,
      text: text,
    });
    await NewMessage.save();
    const message = await Message.find();
    res.status(201).json(message);
  } catch (error) {
    res.status(409).json({ message: err.message });
  }
};

/* Get Message by conversationId */

export const getMessageByConversationId = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const message = await Message.find({ conversationId });
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};
