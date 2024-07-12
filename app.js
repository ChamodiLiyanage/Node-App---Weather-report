const express = require("express");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
