const express = require("express");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();

app.use((req, res, next) => {
   // Accéder à notre API depuis n'importe quel origine
   res.setHeader("Access-Control-Allow-Origin", "*");
   // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
   );
   // Envoyer des requêtes avec les méthodes mentionnées
   res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
   );
   next();
});

// Transformer en json
app.use(express.json());

// Routes Authentification
app.use("/api/auth", userRoutes);

// Routes post
app.use("/api/posts", postRoutes);

// Routes des static (images)
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
