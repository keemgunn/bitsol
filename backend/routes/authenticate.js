const path = require('path');
const express = require('express');
const router = express.Router();

const version = require('../api/config');
const heimdall = require('../api/heimdall');

// user-info
let users_json = path.join(__dirname, '../data/users.json');
let user = version.readSync(users_json);  
console.log('AUTHORIZED USERS: ', user);

// access-log
let access_log_json = path.join(__dirname, '../data/access_log.json');

// for refresh methods
let deposit = { "id" : "accessToken" };



// ============= @issueToken() => $store/ISSUE

router.post('/issue', (req, res) => {
  const device = req["headers"]["user-agent"];
  const {id, expiresIn, accessTime, requestPoint} = req.body;
  if(user.hasOwnProperty(id)) {
    console.log("### userID confirmed .../auth/issue");
    const accessToken = heimdall.generate(user[id]["auth"], requestPoint, expiresIn);
    res.json({ accessToken, id:user[id]["auth"]["id"] });
    console.log("token issued, expiresIn: ", expiresIn, "\n\n\n");
    //_____user-info update_____
      user[id]["state"]["isOnline"] = true;
      user[id]["state"]["device"] = device;
      user[id]["state"]["last-access"] = accessTime;
        version.update(users_json, user);
    //_____user-info update_____
      let newlog ={ accessTime, id, "userName": user[id]["config"]["userName"], device };
      let log = version.readSync(access_log_json);
      log.unshift(newlog);
        version.update(access_log_json, log);
  }else {
      console.log("### no userID .../auth/issue\n\n");
      return res.status(401).json({error: 'Authorization failure - No user id'})
  }
})



// ============= @verify() => $store/VERIFY 

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
      res.json(VERIFY(deposit[id], id))
    }else {
      console.log("### no-access-history ... /auth/verify\n\n");
      res.json({"accessLevel": 0});
    }
  }
});
function VERIFY(token, id){
  let result = heimdall.verify(token, id);
  if(result.accessLevel) {
    console.log(result);
    console.log("### VERIFIED! ... /auth/verify\n\n");
    return result
  }else {
    console.log("authorization-failed ... /auth/verify\n\n");
    return {"accessLevel": 0}
  }
}



// ============= $store/LOAD_CONFIG

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



// ============= REFRESH METHODS

router.post('/deposit', (req, res) => {
  const {id} = req.body;
  deposit[id] = req.headers.authorization;
    user[id]["state"]["isOnline"] = false;
    user[id]["state"]["device"] = "";
  setTimeout(clearDeposit, 1000, id);
  console.log("### token depositted .../auth/depoist\n");
})
router.post('/recover', (req, res) => {
  const {id} = req.body;
  const accessToken = deposit[id];
  res.json({accessToken});
    user[id]["state"]["isOnline"] = true;
    user[id]["state"]["device"] = req["headers"]["user-agent"];
})
function clearDeposit(id){
  delete deposit[id];
  version.update(users_json, user);
  console.log("### token deleted .../auth/depoist\n");
}



// ============= LOGOUT
router.post('/logout', (req, res) => {
  const {id} = req.body;
  user[id]["state"]["isOnline"] = false;
  user[id]["state"]["device"] = "";
  version.update(users_json, user);
  console.log("### LOGGED OUT .../auth/logout");
})



// ============= THEME CHANGER
router.post('/theme/change', (req, res) => {
  const {id, color} = req.body;
  user[id]["config"]["colorConfig"] = color;
  version.update(users_json, user);
  res.json({color});
})



module.exports = router;