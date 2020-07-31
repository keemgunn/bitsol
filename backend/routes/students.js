const express = require('express');
const router = express.Router();

const users = require('../data/users.json')

router.get('/', (req, res, next) => {
  let user = users[req.body.id];
  res.json({
    "username": user["username"],
    "color-config": user["color-config"]
  })
});

module.exports = router;