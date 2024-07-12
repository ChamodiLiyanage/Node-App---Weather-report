const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const generateWeatherText = async (weatherData) => {
  const prompt = `Generate a detailed weather report based on the following data: ${JSON.stringify(
    weatherData
  )}`;

  try {
    const response = await openai.chat.completions.create({
      model: "davinci-002",
      prompt: prompt,
      max_tokens: 150,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(
      "Error generating weather text:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error generating weather text");
  }
};

module.exports = { generateWeatherText };
