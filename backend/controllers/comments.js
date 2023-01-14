const Post = require("../models/Post");

exports.createComment = async (req, res) => {
   try {
      let aggregate = null;
      let post = await Post.findOne({ _id: req.params.id });
      if (post) {
         aggregate = {
            $push: {
               comments: {
                  commenterId: req.body.commenterId,
                  commenterPseudo: req.body.commenterPseudo,
                  text: req.body.text,
                  timestamp: new Date().getTime(),
               },
            },
         };
      }
      if (aggregate) {
         await Post.updateOne({ _id: req.params.id }, aggregate);
      }
      return res.status(201).json({ message: "Comment added" });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.modifyComment = async (req, res) => {
   try {
      let post = await Post.findOne({ _id: req.params.id });
      const { text, userId, commentId } = req.body;
      if (!post) {
         return res.status(404).json({ message: "Post not found" });
      }
      let comment = await post.comments.find(
         (com) => com._id == req.body.commentId
      );
      if (!comment) {
         return res.status(404).json({ message: "Comment not found" });
      }
      if (comment.commenterId != req.auth.userId) {
         return res.status(401).json({ message: "Unauthorized" });
      }
      comment.text = req.body.text;
      const postId = req.params.id;
      await post.save(post);
      return res.status(201).json({
         message: "Comment modified",
         commentId,
         text,
         userId,
         postId,
      });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.deleteComment = async (req, res) => {
   try {
      console.log(req);
      let aggregate = null;
      let post = await Post.findOne({ _id: req.params.id });
      let comment = await post.comments.find(
         (com) => com._id == req.body.commentId
      );
      if (!comment) {
         return res.status(404).json({ message: "Comment not found" });
      }
      console.log(comment);
      console.log(req.auth.userId);
      if (comment.commenterId != req.auth.userId) {
         return res.status(401).json({ message: "Unauthorized" });
      }
      if (post) {
         aggregate = {
            $pull: {
               comments: {
                  _id: req.body.commentId,
               },
            },
         };
      }
      if (aggregate) {
         await Post.updateOne({ _id: req.params.id }, aggregate);
      }
      return res.status(201).json({ message: "Comment deleted" });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};
