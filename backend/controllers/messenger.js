const User = require("../models/User");
const Messenger = require("../models/Messenger");

exports.createMessage = async (req, res) => {
   const { sender, receiver, message } = req.body;

   try {
      const senderUser = await User.findById(sender);
      if (!senderUser)
         return res.status(404).json({ message: "Sender not found" });

      const receiverUser = await User.findById(receiver);
      if (!receiverUser)
         return res.status(404).json({ message: "Receiver not found" });

      let conversation = await Messenger.findOne({
         $or: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender },
         ],
      });

      if (!conversation) {
         conversation = new Messenger({
            sender,
            receiver,
            messages: [{ sender, message }],
         });
      } else {
         conversation.messages.push({ sender, message });
      }
      await conversation.save();
      res.status(201).json({ message: "Message sent successfully" });
   } catch (error) {
      res.status(500).json({ message: "Internal error" });
   }
};

exports.modifyMessage = async (req, res) => {
   try {
      const { messageId, message } = req.body;
      const updatedMessage = await Messenger.findById(messageId);

      if (!updatedMessage) {
         return res.status(404).json({ message: "Message not found" });
      }

      if (
         updatedMessage.sender.toString() !== req.auth.userId &&
         updatedMessage.receiver.toString() !== req.auth.userId
      ) {
         return res.status(401).json({ message: "Not authorized" });
      }

      updatedMessage.message = message;
      await updatedMessage.save();
      res.status(200).json({ message: "Message updated" });
   } catch (error) {
      res.status(500).json({ message: "Internal error" });
   }
};

// Delete la conversation
exports.deleteMessage = async (req, res) => {
   try {
      const { messageId } = req.body;
      const deletedMessage = await Messenger.findById(messageId);

      if (!deletedMessage) {
         return res.status(404).json({ message: "Message not found" });
      }

      if (
         deletedMessage.sender.toString() !== req.auth.userId &&
         deletedMessage.receiver.toString() !== req.auth.userId
      ) {
         return res.status(401).json({ message: "Not authorized" });
      }

      await deletedMessage.remove();
      res.status(200).json({ message: "Message deleted" });
   } catch (error) {
      res.status(500).json({ message: "Internal error" });
   }
};

exports.getOneMessage = async (req, res) => {
   try {
      let message = await Messenger.findOne({ _id: req.params.id });
      if (!message) {
         return res.status(404).json({ message: "Internal error" });
      }
      return res.status(200).json(message);
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.getAllMessage = async (req, res) => {
   try {
      console.log(req.auth.userId);
      let messages = await Messenger.find({
         $or: [{ sender: req.auth.userId }, { receiver: req.auth.userId }],
      });
      if (!messages) {
         return res.status(404).json({ message: "Message not found" });
      }
      console.log(messages);
      return res.status(200).json(messages);
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};
