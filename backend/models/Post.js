const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
   {
      userId: { type: mongoose.Types.ObjectId, required: true },
      description: { type: String, required: true },
      imageUrl: { type: String },
      comments: {
         type: [
            {
               commenterId: String,
               commenterPseudo: String,
               text: String,
               timestamp: Number,
               /* likes: { type: Number, default: 0 },
               usersLiked: [String], */
            },
         ],
         required: true,
      },
      likes: { type: Number, default: 0 },
      // type: [String] pour créer un tableau comprenant du String
      usersLiked: { type: [String], required: false },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Post", postSchema);
