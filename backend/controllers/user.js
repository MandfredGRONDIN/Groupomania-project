const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const mongoose = require("mongoose");

const User = require("../models/User");

exports.signup = async (req, res) => {
   console.log(req.body);
   try {
      let hash = await bcrypt.hash(req.body.password, 10);
      let user = new User({
         pseudo: req.body.pseudo,
         email: req.body.email,
         password: hash,
      });
      if (req.body.password != req.body.passwordCheck) {
         return res
            .status(400)
            .json({ errorPasswordCheck: "Different passwords" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
         expiresIn: "24h",
      });
      await user.save();
      return res.status(201).json({
         userCreated: "User created !",
         userId: user._id,
         token,
      });
   } catch (e) {
      console.error(e);
      if (e.errors && e.errors.email && e.errors.email.kind === "unique") {
         return res.status(400).json({ errorEmail: "Existing email" });
      }
      if (e.errors && e.errors.pseudo && e.errors.pseudo.kind === "unique") {
         return res.status(400).json({ errorPseudo: "Existing pseudo" });
      }
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.login = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
         return res.status(404).json({ errorEmail: "User not find !" });
      }
      let valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
         return res.status(401).json({ errorPassword: "Incorrect password !" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
         expiresIn: "24h",
      });

      let oldTokens = user.tokens || [];

      if (oldTokens.length) {
         oldTokens = oldTokens.filter((t) => {
            const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
            if (timeDiff < 86400) {
               return t;
            }
         });
      }

      await User.findByIdAndUpdate(user._id, {
         tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
      });

      return res.status(200).json({
         userId: user._id,
         token,
      });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.logout = async (req, res) => {
   if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      if (!decodedToken) {
         return res.status(401).json({ message: "Authentification failed" });
      }
      const tokens = req.auth.tokens;

      const newTokens = tokens.filter((t) => t.userId !== decodedToken.userId);

      await User.findByIdAndUpdate(req.auth.userId, { tokens: newTokens });
      return res.status(200).json({ message: "Sign out" });
   }
};

exports.getOneUser = async (req, res) => {
   try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         return res.status(400).json({ message: "Invalid user ID" });
      }

      let user = await User.findOne({ _id: req.params.id });
      if (!user) {
         return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json(user);
   } catch (e) {
      console.error("ici", e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.getOnePseudoUser = async (req, res) => {
   try {
      const searchUser = req.query.user;
      const users = await User.find({
         pseudo: { $regex: searchUser, $options: "i" },
      });
      console.log(users);
      return res.status(200).json(users);
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.modifyUser = async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      user.pseudo = req.body.pseudo;

      if (req.file) {
         // Si l'utilisateur a déjà une image de profil, on la supprime
         if (user.picture && user.picture !== "") {
            // Récupère le nom de l'ancienne image
            const filename = user.picture.split("/images/")[0];
            if (filename) {
               // Supprime l'ancienne image du disque
               try {
                  await fs.unlink(`images/${filename}`);
               } catch (error) {
                  console.error(error);
               }
            }
         }
         // Assigne la nouvelle image au modèle
         user.picture = req.file.filename;
      }

      await user.save();
      return res.status(200).json({ message: "User modified" });
   } catch (e) {
      console.error(e);
      if (e.errors && e.errors.pseudo && e.errors.pseudo.kind === "unique") {
         return res.status(400).json({ errorPseudo: "Existing pseudo" });
      }
      return res.status(500).json({ message: "Internal error" });
   }
};
