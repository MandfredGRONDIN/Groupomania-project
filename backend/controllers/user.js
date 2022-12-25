const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = async (req, res) => {
    console.log(req.body)
    try{
        let hash = await bcrypt.hash(req.body.password, 10)
        let user = new User ({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
        });
        if(req.body.password != req.body.passwordCheck){
            return res.status(400).json({errorPasswordCheck : 'Different passwords'})
        }
        await user.save()
        return res.status(201).json(
            {
            userCreated: 'User created !',
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN_KEY,
                { expiresIn: '24h' }
            )
        })
    } catch(e) {
        console.error(e)
        if(e.errors && e.errors.email && e.errors.email.kind === 'unique'){ 
            return res.status(400).json({errorEmail : 'Existing email'})
        }
        if(e.errors && e.errors.pseudo && e.errors.pseudo.kind  === 'unique'){
            return res.status(400).json({errorPseudo : 'Existing pseudo'})
        }
        return res.status(500).json({ message: 'Internal error' })
    }
}

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(404).json({ errorEmail: 'User not find !' });
        }
        let valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ errorPassword: 'Incorrect password !' });
        }
        return res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN_KEY,
                { expiresIn: '24h' }
            )
        });
    } catch(e) {
        console.error(e)
        return res.status(500).json({ message : "Internal error" })
    }
}

exports.getOneUser = async (req, res) => {
    try{
        let user = await User.findOne({_id: req.params.id})
        if(!user){
            return res.status(404).json({message: "Not found"})
        }
        return res.status(200).json(user)
    } catch (e) {
        console.error(e)
        return res.status(500).json({message: "Internal error"})
    }
}

exports.modifyUser = async (req, res) => {
    try{
        console.log(req.body);
        let userObject;
        try {
            userObject = JSON.parse(req.body.user);
        } catch(e) {
            userObject = req.body.user;
        }
        console.log(userObject);
        const userData = req.file ? {
            ...userObject,
            picture: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
          }`
        } : {
            ...userObject,
            picture:""
        }
        console.log(userData);
        delete userData.userId
        let user = await User.findOne({ _id: req.params.id});
        if(!user){
            return res.status(404).json({ message: "Not found"})
        }
        if(user._id != req.auth.userId){
            return res.status(401).json({message : "Unauthorized"})
        }
        if(user.picture != ""){
            const filename = post.imageUrl.split("/images/")[1];
            await fs.unlink(`images/${filename}`)
        }
        await User.updateOne({ _id: req.params.id},{...userData, _id: req.params.id})
        return res.status(201).json({message : "User modified"})
    } catch (e) {
        console.error(e)
        if(e.errors && e.errors.pseudo && e.errors.pseudo.kind  === 'unique'){
            return res.status(400).json({errorPseudo : 'Existing pseudo'})
        }
        return res.status(500).json({message : "Internal error"})
    }
}