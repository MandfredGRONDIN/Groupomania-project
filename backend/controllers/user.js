const bcrypt = require('bcrypt');
const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = async (req, res) => {
    console.log(req.body)
    try{
        let hash = await bcrypt.hash(req.body.password, 10)
        let hmacSHA256 = await SHA256(req.body.email + `${process.env.CRYPTOJS_EMAIL}`)
        console.log(req.body.password);
        console.log(req.body.passwordCheck);
        let user = new User ({
            pseudo: req.body.pseudo,
            email: hmacSHA256,
            password: hash,
        });
        if(req.body.password != req.body.passwordCheck){
            return res.status(400).json({message : 'Different passwords'})
        }
        await user.save()
        return res.status(201).json({message: 'User created !'})
    } catch(e) {
        console.error(e)
        if(e.errors && e.errors.email && e.errors.email.kind === 'unique'){ 
            return res.status(400).json({message : 'Existing email'})
        }
        if(e.errors && e.errors.pseudo  === 'unique'){
            return res.status(400).json({message : 'Existing pseudo'})
        }
        return res.status(500).json({ message: 'Internal error' })
    }
}

exports.login = (req, res, next) => {

}