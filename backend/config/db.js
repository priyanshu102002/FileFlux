const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.MONGO_URL;

const connectDB = async () => {
	try {
    await mongoose.connect(URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

module.exports = connectDB;
