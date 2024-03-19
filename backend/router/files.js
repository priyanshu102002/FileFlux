const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		return cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		// 22-1234567890.png
		const uniqueName = `${
			Date.now() + "-" + Math.round(Math.random() * 1e9)
		}${path.extname(file.originalname)}`;

		cb(null, uniqueName);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: 1000000 * 100 }, //100Mb
}).single("myFile");

router.post("/", (req, res) => {
	// store files
	upload(req, res, async (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}

		// req.file -> multer is aa rha hai
		if (!req.file) {
			return res.json({ error: "All Files are required" });
		}

		// Store files in db
		const file = new File({
			filename: req.file.filename,
			uuid: uuid4(),
			path: req.file.path,
			size: req.file.size,
		});

		const response = await file.save();

		// Sending url to client
		return res.json({
			file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
		});
	});
});

module.exports = router;
