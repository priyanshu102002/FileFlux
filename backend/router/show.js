const express = require("express");
const show = require("../controllers/show.controller");

const router = express.Router();

router.get("/:uuid", show);

module.exports = router;
