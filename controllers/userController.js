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
    user.weatherData = [{ date: new Date(), data: weatherData }];
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
