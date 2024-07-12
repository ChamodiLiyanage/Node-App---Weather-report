const express = require("express");
const router = express.Router();
const {
  addUser,
  updateUserLocation,
  getUserWeatherData,
} = require("../controllers/userController");

router.post("/", addUser);
router.put("/:email", updateUserLocation);
router.get("/:email/weather", getUserWeatherData);

module.exports = router;
