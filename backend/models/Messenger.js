const mongoose = require("mongoose");

const messengerSchema = mongoose.Schema(
   {
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      receiver: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      messages: [
         {
            message: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
         },
      ],
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Messenger", messengerSchema);
