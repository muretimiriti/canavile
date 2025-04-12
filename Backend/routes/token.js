const express = require('express');
const { createToken, stkPush, handleCallback } = require("../controller/token"); // Correct path

const router = express.Router(); // Use Router instance

router.post("/", async (req, res) => {
  try {
    const token = await createToken(req, res); // Use await for promise
    await stkPush(req, res, token); // Pass the token
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating token or processing request" });
  }
});

// New route to handle the callback from M-Pesa API
router.post("/callback", async (req, res) => {
  try {
    await handleCallback(req, res); // Handle the callback and return response to frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing callback" });
  }
});

module.exports = router; // Export Router instance