const monngoose = require("mongoose");

const connectDB = async () => {
  try {
    await monngoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
