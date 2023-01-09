const Post = require("../models/Post");
const fs = require("fs").promises;

exports.createPost = async (req, res) => {
   try {
      const { description, userId } = req.body;
      const imageUrl = req.file
         ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
         : ``;

      const postObject = {
         description,
         userId,
         imageUrl,
      };

      const post = new Post({
         ...postObject,
         userId: req.auth.userId,
      });
      const postImg = post.imageUrl;
      await post.save();
      return res.status(201).json({ message: "Post recorded", postImg });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.modifyPost = async (req, res) => {
   try {
      const { description, userId } = req.body;
      const imageUrl = req.file
         ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
         : ``;

      const postObject = {
         description,
         userId,
         imageUrl,
      };
      delete postObject.userId;
      let post = await Post.findOne({ _id: req.params.id });
      if (!post) {
         return res.status(404).json({ message: "Not found" });
      }
      if (post.userId != req.auth.userId) {
         return res.status(401).json({ message: "Unauthorized" });
      }
      if (post.imageUrl != "") {
         const filename = post.imageUrl.split("/images/")[1];
         await fs.unlink(`images/${filename}`);
      }
      await Post.updateOne(
         { _id: req.params.id },
         { ...postObject, _id: req.params.id }
      );
      const id = req.params.id;
      return res.status(201).json({
         message: "Post modified",
         id,
         imageUrl,
         description,
         userId,
      });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.deletePost = async (req, res) => {
   try {
      let post = await Post.findOne({ _id: req.params.id });
      if (!post) {
         return res.status(404).json({ message: "Not found" });
      }
      if (post.userId != req.auth.userId) {
         return res.status(401).json({ message: "Unauthorized" });
      }
      if (req.file) {
         const filename = post.imageUrl.split("/images/")[1];
         await fs.unlink(`images/${filename}`);
      }
      await Post.deleteOne({ _id: req.params.id });
      return res.status(201).json({ message: "Post removed" });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.getOnePost = async (req, res) => {
   try {
      let post = await Post.findOne({ _id: req.params.id });
      if (!post) {
         return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json(post);
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.getAllPost = async (req, res) => {
   try {
      let posts = await Post.find();
      if (!posts) {
         return res.status(404).json({ message: "Post not found" });
      }
      return res.status(200).json(posts);
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.likePost = async (req, res) => {
   try {
      let aggregate = null;
      let post = await Post.findOne({ _id: req.params.id });
      if (post.usersLiked.find((user) => user === req.body.userId)) {
         aggregate = {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
         };
      } else {
         aggregate = {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
         };
      }
      if (aggregate) {
         await Post.updateOne({ _id: req.params.id }, aggregate);
      }
      return res.status(201).json({ message: "Added/Deleted like" });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};
