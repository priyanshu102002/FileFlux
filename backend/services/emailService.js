const nodemailer = require("nodemailer");

const sendMail = async ({ from, to, subject, text, html }) => {
	if (!from || !to || !subject || !text || !html) {
		throw new Error("All fields are required.");
	}

	let transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		requireTLS: true,
		auth: {
			user: process.env.SMTP_EMAIL,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	let info = await transporter.sendMail({
		from,
		to,
		subject,
		text,
		html,
	});

	if (info.messageId) {
		return true;
	}
	return false;
};

module.exports = sendMail;
