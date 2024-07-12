const User = require("../models/User");
const { getWeatherData } = require("../services/weatherService");

exports.addUser = async (req, res) => {
  const { email, location } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ email, location });
    await user.save();

    const weatherData = await getWeatherData(location);
    user.weatherData.push({ date: new Date(), data: weatherData });
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.updateUserLocation = async (req, res) => {
  const { email } = req.params;
  const { location } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.location = location;
    await user.save();

    const weatherData = await getWeatherData(location);
    user.weatherData.push({ date: new Date(), data: weatherData });
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getUserWeatherData = async (req, res) => {
  const { email } = req.params;
  const { date } = req.query;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const weatherDataForDate = user.weatherData.filter((data) => {
      return new Date(data.date).toISOString().split("T")[0] === date;
    });

    if (weatherDataForDate.length === 0) {
      return res
        .status(404)
        .json({ message: "No weather data found for this date" });
    }
    res.json(weatherDataForDate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
