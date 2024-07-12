const axios = require("axios");

exports.getWeatherData = async (location) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
