const auth = require("../auth");
const test = require("../phanQuyen")
const express = require("express");
const router = express.Router();
const LCController = require("../controllers/lc-controller")

router.post("/lcmovie", auth, test, LCController.createLC)
router.post("/datve",  auth, test, LCController.createTicket)
router.get("/lcmovie/:id",LCController.getLCById )

module.exports = router