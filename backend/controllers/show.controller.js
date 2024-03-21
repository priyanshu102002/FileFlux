const File = require("../models/file");

const show = async (req, res) => {
	try {
		const file = await File.findOne({ uuid: req.params.uuid });

		if (!file) {
			return res.status(404).json({ error: "File not found" });
		}

		return res.status(200).json({
			uuid: file.uuid,
			filename: file.filename,
			filesize: file.size,
			downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
			//download link hai ye
		});
	} catch (error) {
		return res.status(500).json({ error: "Something went wrong" });
	}
}

module.exports = show