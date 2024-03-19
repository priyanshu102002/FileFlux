const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const filesRoute = require("./router/files");

const app = express();
dotenv.config();

PORT = process.env.PORT || 8000;

// DB connection
connectDB();

app.use(express.json());

app.use("/api/files", filesRoute);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
