const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required: true},
    description: {type: String, required: true},
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    // type: [String] pour créer un tableau comprenant du String
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false }
})

module.exports = mongoose.model('Post', postSchema)