const path = require('path');
const express = require('express');
const router = express.Router();
const version = require('../api/config');
const auth = require('../api/auth');
const { date } = require('joi');


// users.json
let users_json = path.join(__dirname, '../data/users.json');
let user = version.readSync(users_json);  
console.log('AUTHORIZED USERS: ', user);


// keeping accessKey for 3 seconds
let deposit = {
  "userKey" : "accessToken"
};



// $store/ISSUE
router.post('/issue', (req, res) => {
  const userAgent = req["headers"]["user-agent"];
  const {key, expiresIn, accessTime, requestPoint} = req.body;
  if(user.hasOwnProperty(key)) {
    console.log("### userID confirmed .../auth/issue");
    
    const accessToken = auth.signToken(user[key]["auth"], requestPoint, expiresIn);
      user[key]["state"]["isOnline"] = true;
      user[key]["state"]["platform"] = userAgent;
      user[key]["state"]["last-access"] = accessTime;

    // access_log 기록

    version.update(users_json, user);

    res.json({
      accessToken,
      expiresIn,
      userKey: user[key]["auth"]["key"]
    });
    
    console.log("token issued, expiresIn: ", expiresIn, "\n\n\n");

  }else {
      console.log("### no userID .../auth/issue\n\n");
      return res.status(401).json({error: 'Authorization failure - No user id'})
  }
})



// $store/VERIFY
router.post('/verify', (req, res) => {
  console.log("### initiating-verification ... /auth/verify");
  if(req.headers.authorization) {
    console.log("### accessToken-Detected ... /auth/verify");
    const { userKey } = req.body;
    let result = auth.verify(req.headers.authorization, userKey);
    console.log(result, "\n\n");
    if(result.accessLevel) {
      res.json(result);
      console.log("### VERIFIED! ... /auth/verify\n\n");
    }else {
      console.log("authorization-failed ... /auth/verify");
      res.json({
        "key": "",
        "accessLevel": 0
      });
    }
  }else {
    console.log("### no-access-token ... /auth/verify");
    if(req.body) {
      const { userKey } = req.body;
      if(deposit.hasOwnProperty(userKey)){
        console.log("### access-history-found ... /auth/verify");
        let result = auth.verify(deposit[userKey], userKey);
        if(result.accessLevel) {
          console.log(result);
          console.log("### VERIFIED! ... /auth/verify\n\n");
          res.json(result);
        }else {
          console.log("authorization-failed ... /auth/verify\n\n");
          res.json({
            "key": "",
            "accessLevel": 0
          });
        }
      }else {
        console.log("### no-access-history ... /auth/verify\n\n");
        res.json({
          "key": "",
          "accessLevel": 0
        });
      }
    }else {
      console.log("no-request-data ... /auth/verify\n\n");
      res.json({
        "key": "",
        "accessLevel": 0
      });
    }
  }
})



// $store/LOAD_CONFIG
router.post('/load-config', (req, res) => {
  const data = req.body;
  console.log(data);
  if(user.hasOwnProperty(data.key)) {
      res.json(user[data.key]["config"]);
      console.log("### config loaded .../auth/load-config");
  }else {
      console.log("### no userID .../auth/load-config");
      return res.status(404).json({error: 'No user id'})
  }
})



// reIssueToken()
router.post('/reissue', (req, res) => {
  const {key, requestPoint} = req.body;
  if(user.hasOwnProperty(key)) {
    console.log("### reissueing .../auth/session-out");
    const temporaryToken = auth.signToken(user[key]["auth"], requestPoint, 3);

    deposit[key] = temporaryToken;

    user[key]["state"]["isOnline"] = false;
    user[key]["state"]["platform"] = "";

    version.update(users_json, user);

    console.log("token reissued, expiresIn: ", 3, "\n\n");

  }else {
    console.log("### no userID .../auth/session-out");
    return res.status(404).json({error: 'No user id'});
  }
})



router.post('/logout', (req, res) => {
  const {userKey} = req.body;

  user[userKey]["state"]["isOnline"] = false;
  user[userKey]["state"]["platform"] = "";

  // access_log 기록

  console.log("### LOGGED OUT .../auth/logout");
})




module.exports = router