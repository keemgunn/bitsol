const path = require('path');
const express = require('express');
const router = express.Router();
const version = require('../api/config');
const auth = require('../api/auth');


// USER CONFIG
let user = version.readSync(path.join(__dirname, '../data/users.json'));  //users.json
console.log('AUTHORIZED USERS: ', user);


// GET TOKEN
router.post('/login', async (req, res) => {
  let accessToken;
  const {key, expiresIn} = req.body;
  if(user.hasOwnProperty(key)) {
      console.log("### userID confirmed .../api/login");
      accessToken = auth.signToken(user[key]["id"], user[key]["access-level"], expiresIn);
      res.json({accessToken});
  }else {
      console.log("### no userID .../api/login");
      return res.status(401).json({error: 'Login failure'})
  }
})


// VERIFY TOKEN
router.get('/verify', (req, res) => {
  console.log("### USER VERIFIED ... /auth/verify");
  console.log(req.headers);
  if(req.headers.authorization) {
    let result = auth.verify(req.headers.authorization);
    console.log(result);
    if(result) {
        res.json({
            "accessLevel": result.accessLevel,
            "msg": result.msg
        });
    }else {
      console.log("authorization-failed");
      res.json({
        "accessLevel": 0,
        "msg": "something wrong"
    });
    }
  }else {
    console.log("no-access-token");
    res.json({
      "accessLevel": 0,
      "msg": "No Token"
    });
  }
})


module.exports = router