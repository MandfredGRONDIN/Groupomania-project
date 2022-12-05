const Post = require("../models/Post");
const fs = require('fs').promises;

exports.createPost = async (req, res) => {
    try{
        const postObject = JSON.parse(JSON.stringify(req.body.post));
        delete postObject._id;
        delete postObject.userId;
        const post = new Post({
            ...postObject,
            userId: req.auth.userId,
            /* imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }` */
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

    } catch (e) {
        
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