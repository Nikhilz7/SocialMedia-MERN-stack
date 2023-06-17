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
    // const { conversationId } = req.body;
    // console.log("conversationId");
    // const messages = await Message.find({});
    const { conversationId } = req.params;
    // const user = await User.findById(id);
    const messages = await Message.find({
      conversationId: conversationId,
    });
    // console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};
