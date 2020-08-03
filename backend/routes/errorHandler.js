const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/verify', (req, res) => {
  console.log("### VERIFIED FAILED .../verify/errorHandler");
  res.json({
    "accessLevel": 0,
    "msg": "No AccessToken"
  });
}) 










module.exports = router