const path = require('path');
const express = require('express');
const router = express.Router();
const version = require('../api/config');
const auth = require('../api/auth');


// users.json
let user = version.readSync(path.join(__dirname, '../data/users.json'));  
console.log('AUTHORIZED USERS: ', user);


// @/App.vue/ getToken(key,expiresIn)
router.post('/issue', (req, res) => {
  let accessToken;
  const {key, expiresIn} = req.body;
  if(user.hasOwnProperty(key)) {
      console.log("### userID confirmed .../auth/issue");
      accessToken = auth.signToken(user[key]["id"], user[key]["access-level"], expiresIn);
      res.json({
        accessToken,
        expiresIn,
        userKey: user[key]["key"]
      });
      console.log("token issued, expiresIn: ", expiresIn, "\n\n\n");
  }else {
      console.log("### no userID .../api/issue");
      return res.status(401).json({error: 'Authorization failure - No user id'})
  }
})
router.post('/load-config', (req, res) => {
  let accessToken;
  const {key} = req.body;
  if(user.hasOwnProperty(key)) {
      console.log("### userID confirmed .../auth/load-config");
      res.json({
        userName: user[key]["username"],
        colorConfig: user[key]["color-config"]
      });
      console.log("config loaded");
  }else {
      console.log("### no userID .../api/load-config");
      return res.status(401).json({error: 'No user id'})
  }
})





// @/App.vue/ heimdall()
router.get('/verify', (req, res) => {
  console.log("### USER VERIFIED ... /auth/verify");
  console.log(req.headers);
  if(req.headers.authorization) {
    let result = auth.verify(req.headers.authorization);
    console.log(result, "\n\n\n");
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