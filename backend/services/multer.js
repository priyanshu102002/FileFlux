const multer = require("multer");
const path = require("path");

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

module.exports = upload