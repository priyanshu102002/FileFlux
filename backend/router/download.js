const express = require("express");
const download = require("../controllers/download.controller");

const router = express.Router();

router.get("/:uuid",download);

module.exports = router;
