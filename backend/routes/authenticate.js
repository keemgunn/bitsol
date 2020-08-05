const path = require('path');
const express = require('express');
const router = express.Router();
const version = require('../api/config');
const auth = require('../api/auth');


// users.json
let users_json = path.join(__dirname, '../data/users.json');
let user = version.readSync(users_json);  
console.log('AUTHORIZED USERS: ', user);


// $store/ISSUE
router.post('/issue', (req, res) => {
  const userAgent = req["headers"]["user-agent"];
  const {key, expiresIn, accessTime, requestPoint} = req.body;
  if(user.hasOwnProperty(key)) {
    console.log("### userID confirmed .../auth/issue");
    
    user[key]["state"]["requestPoint"] = requestPoint;
    
    const accessToken = auth.signToken(user[key]["auth"], requestPoint, expiresIn);

    user[key]["state"]["isOnline"] = true;
    user[key]["state"]["platform"] = userAgent;
    user[key]["state"]["last-access"] = accessTime;
    
    version.update(users_json, user);

    res.json({
      accessToken,
      expiresIn,
      userKey: user[key]["auth"]["key"]
    });
    
    console.log("token issued, expiresIn: ", expiresIn, "\n\n\n");

  }else {
      console.log("### no userID .../api/issue");
      return res.status(401).json({error: 'Authorization failure - No user id'})
  }
})



// $store/VERIFY
router.post('/verify', (req, res) => {
  if(req.headers.authorization) {
    console.log("### accessToken Detected ... /auth/verify");

    const { requestPoint } = req.body;

    let result = auth.verify(req.headers.authorization, requestPoint);
    console.log(result, "\n\n\n");

    if(result) {
        res.json(result);
    }else {
      console.log("authorization-failed");
      res.json({
        "key": "",
        "accessLevel": 0
    });
    }
  }else {
    console.log("### no-access-token ... /auth/verify");
    res.json({
      "key": "",
      "accessLevel": 0
    });
  }
})



// $store/LOAD_CONFIG
router.post('/load-config', (req, res) => {
  const data = req.body;
  console.log(user);
  console.log(data);
  if(user.hasOwnProperty(data.key)) {
      res.json(user[data.key]["config"]);
      console.log("### config loaded .../auth/load-config");
  }else {
      console.log("### no userID .../api/load-config");
      return res.status(404).json({error: 'No user id'})
  }
})




module.exports = router