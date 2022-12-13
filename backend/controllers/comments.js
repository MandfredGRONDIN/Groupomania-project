const Post = require("../models/Post");
const fs = require('fs').promises;

exports.createComment = async (req, res) => {
    try{
        let aggregate = null;
        let post = await Post.findOne({ _id: req.params.id})
        if(post){
            aggregate = {
                $push:{
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                },
            }
        }
        if(aggregate){
            await Post.updateOne({ _id: req.params.id}, aggregate)
        }
        return res.status(201).json({message: "Comment added"})
    } catch(e) {
        console.error(e);
        return res.status(500).json({ message: "Internal error" });
    }
}

exports.modifyComment = async (req, res) => {
    try{

    } catch(e) {

    }
}

exports.deleteComment = async (req, res) => {
    try{

    } catch(e) {

    }
}