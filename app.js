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

const cron = require("node-cron");
const User = require("./models/User");
const { getWeatherData } = require("./services/weatherService");
const { sendWeatherReport } = require("./utils/emailService");

cron.schedule("0 0 */3 * * *", async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const weatherData = await getWeatherData(user.location);
      const text = `Weather report for ${user.location}: ${JSON.stringify(
        weatherData
      )}`;
      sendWeatherReport(user.email, "Hourly Weather Report", text);
    }
  } catch (error) {
    console.error(error.message);
  }
});
