const express = require('express');
const router = express.Router();

const users = require('../data/users.json')

router.get('/', (req, res, next) => {
  console.log(users);
  // let user = users[req.body.id];
  // res.json({
  //   "username": user["username"],
  //   "color-config": user["color-config"]
  // })
  // res.send(users);
  res.json(users);
});

module.exports = router;