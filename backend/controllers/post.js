const Post = require("../models/Post");
const fs = require('fs').promises;

exports.createPost = async (req, res) => {
    try{
        const postObject = JSON.parse(req.body.post);
        delete postObject._id;
        delete postObject.userId;
        const post = new Post({
            ...postObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }` 
        })
        console.log(post)
        await post.save();
        return res.status(201).json({message: "Post recorded"})
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal error" });
    }
}

exports.modifyPost = async (req, res) => {
    try{
        const postObject = req.file ? {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
          }`
        } : {
            ...req.body
        }
        delete postObject.userId
        let post = await Post.findOne({ _id: req.params.id});
        if(!post){
            return res.status(404).json({ message: "Not found"})
        }
        if(post.userId != req.auth.userId){
            return res.status(401).json({message : "Unauthorized"})
        }
        if(req.file){
            const filename = post.imageUrl.split("/images/")[1];
            await fs.unlink(`images/${filename}`)
        }
        await Post.updateOne({ _id: req.params.id},{...postObject, _id: req.params.id})
        return res.status(201).json({message : "Post modified"})
    } catch (e) {
        return res.status(500).json({message : "Internal error"})
    }
}

exports.deletePost = async (req, res) => {
    try{

    } catch (e) {
        
    }
}

exports.getOnePost = async (req, res) => {
    try{

    } catch (e) {
        
    }
}

exports.getAllPost = async (req, res) => {
    try{

    } catch (e) {
        
    }
}

exports.likePost = async (req, res) => {
    try{

    } catch (e) {
        
    }
}