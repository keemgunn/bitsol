const path = require('path');
const express = require('express');
const router = express.Router();
const version = require('../api/config');
const auth = require('../api/auth');


// users.json
let users_json = path.join(__dirname, '../data/users.json');
let user = version.readSync(users_json);  
console.log('AUTHORIZED USERS: ', user);

// temporary accessToken
let deposit = {
  "id" : "accessToken"
};


// $store/ISSUE
router.post('/issue', (req, res) => {
  const userAgent = req["headers"]["user-agent"];
  const {id, expiresIn, accessTime, requestPoint} = req.body;
  if(user.hasOwnProperty(id)) {
    console.log("### userID confirmed .../auth/issue");
    const accessToken = auth.signToken(user[id]["auth"], requestPoint, expiresIn);
      user[id]["state"]["isOnline"] = true;
      user[id]["state"]["platform"] = userAgent;
      user[id]["state"]["last-access"] = accessTime;

    // access_log 기록

    version.update(users_json, user);

    res.json({
      accessToken,
      id: user[id]["auth"]["id"]
    });
    
    console.log("token issued, expiresIn: ", expiresIn, "\n\n\n");

  }else {
      console.log("### no userID .../auth/issue\n\n");
      return res.status(401).json({error: 'Authorization failure - No user id'})
  }
})


// @heimdall() => $store/VERIFY
router.post('/verify', (req, res) => {
console.log("### initiating-verification ... /auth/verify");
const {id} = req.body || {id: "none"};
  if(req.headers.authorization) {
    console.log("### accessToken-Detected ... /auth/verify");
    res.json(VERIFY(req.headers.authorization, id))
  }else {
  console.log("### no-access-token ... /auth/verify");
    if(deposit.hasOwnProperty(id)){
      console.log("### access-history-found ... /auth/verify");
      res.json(VERIFY(deposit[id], id, res))
    }else {
      console.log("### no-access-history ... /auth/verify\n\n");
      res.json({"accessLevel": 0});
    }
  }
});
function VERIFY(token, id){
  let result = auth.verify(token, id);
  if(result.accessLevel) {
    console.log(result);
    console.log("### VERIFIED! ... /auth/verify\n\n");
    return result
  }else {
    console.log("authorization-failed ... /auth/verify\n\n");
    return {"accessLevel": 0}
  }
}


// $store/LOAD_CONFIG
router.post('/load-config', (req, res) => {
  const data = req.body;
  console.log(data);
  if(user.hasOwnProperty(data.id)) {
      res.json(user[data.id]["config"]);
      console.log("### config loaded .../auth/load-config");
  }else {
      console.log("### no userID .../auth/load-config");
      return res.status(404).json({error: 'No user id'})
  }
})



// reIssueToken()
router.post('/reissue', (req, res) => {
  const {id, requestPoint} = req.body;
  if(user.hasOwnProperty(id)) {
    console.log("### reissueing .../auth/session-out");
    const temporaryToken = auth.signToken(user[id]["auth"], requestPoint, 3);

    deposit[id] = temporaryToken;

    user[id]["state"]["isOnline"] = false;
    user[id]["state"]["platform"] = "";

    version.update(users_json, user);

    console.log("token reissued, expiresIn: ", 3, "\n\n");

  }else {
    console.log("### no userID .../auth/session-out");
    return res.status(404).json({error: 'No user id'});
  }
})



router.post('/logout', (req, res) => {
  const {id} = req.body;

  user[id]["state"]["isOnline"] = false;
  user[id]["state"]["platform"] = "";

  // access_log 기록

  console.log("### LOGGED OUT .../auth/logout");
})




module.exports = router;