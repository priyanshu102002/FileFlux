const express = require("express");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");
const sendMail = require("../services/emailService");
const upload = require("../services/multer")

const router = express.Router();


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

		// Sending url to client (url ke liye)
		return res.json({
			file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
		});
	});
});

router.post("/send", async (req, res) => {
	// emailTo -> receiver email
	// emailFrom -> sender email (mera email)
	const { uuid, emailTo, emailFrom } = req.body;

	if (!uuid || !emailTo || !emailFrom) {
		return res.status(422).send({ error: "All fields are required.." });
	}

	const file = await File.findOne({ uuid });

	// Do baar req send na ho (email already sent)
	if (file.sender) {
		return res.status(422).send({ error: "Email already sent" });
	}

	file.sender = emailFrom;
	file.receiver = emailTo;

	// store files in db
	const response = await file.save();

	// send email
	sendMail({
		from: emailFrom,
		to: emailTo,
		subject: "File sharing",
		text: `${emailFrom} shared a file with you`,
		html: require("../services/emailTemplate")({
			emailFrom: emailFrom,
			downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
			size: parseInt(file.size / 1000) + " KB",
			expires: "24 hours",
		})
	})

	return res.send({ success: true , response});
});

module.exports = router;
