const express = require("express");
const messengerCtrl = require("../controllers/messenger");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", messengerCtrl.createMessage);

router.put("/modify/:id", auth, messengerCtrl.modifyMessage);

router.delete("/delete/:id", auth, messengerCtrl.deleteMessage);

router.get("/getone/:id", auth, messengerCtrl.getOneMessage);

router.get("/getall", auth, messengerCtrl.getAllMessage);

module.exports = router;
