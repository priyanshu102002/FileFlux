const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const filesRoute = require("./router/files");
const showRoute = require("./router/show");
const downloadRoute = require("./router/download");

const app = express();
dotenv.config();

PORT = process.env.PORT || 8000;

// DB connection
connectDB();

app.use(express.json());

app.use("/api/files", filesRoute);
app.use("/files", showRoute);
app.use("/files/download", downloadRoute);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
