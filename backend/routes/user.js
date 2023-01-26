const express = require("express");
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config");

router.post("/signup", userCtrl.signup);

router.post("/login", userCtrl.login);

router.post("/logout", auth, userCtrl.logout);

router.get("/log/:id", userCtrl.getOneUser);

router.get("/search", userCtrl.getOnePseudoUser);

router.put("/modify/:id", multer, userCtrl.modifyUser);

module.exports = router;
