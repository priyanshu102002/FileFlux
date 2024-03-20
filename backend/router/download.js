const express = require("express");
const File = require("../models/file");

const router = express.Router();

router.get("/:uuid", async (req, res) => {
	try {
		const file = await File.findOne({ uuid: req.params.uuid });

		if (!file) {
			return res.status(404).json({ error: "File not found" });
		}

		const filePath = `${__dirname}/../${file.path}`;

		// Download the file
		res.download(filePath);
	} catch (error) {
		return res.status(500).json({ error: "Something went wrong" });
	}
});

module.exports = router;
