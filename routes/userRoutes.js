const express = require("express");
const router = express.Router();
const {
  addUser,
  updateUserLocation,
} = require("../controllers/userController");

router.post("/", addUser);
router.put("/:email", updateUserLocation);

module.exports = router;
