const path = require('path');
const express = require('express');
const router = express.Router();

const config = require('../api/config');
const heimdall = require('../api/heimdall');



// ============= @login() => $store/LOGIN

router.post('/login', (req, res) => {
  const device = req["headers"]["user-agent"];
  const {id, expiresIn, accessTime, requestPoint} = req.body;
  if(config.user.hasOwnProperty(id)) {
    console.log("### userID confirmed .../auth/login");
    const accessToken = heimdall.generate(config["user"][id]["auth"], requestPoint, expiresIn);
    res.json({ 
      accessToken, 
      id:config["user"][id]["auth"]["id"],
      config: config["user"][id]["config"]
    });
    console.log("token issued, expiresIn: ", expiresIn, "\n");
    //_____user-info update_____
      config["user"][id]["state"]["isOnline"] = true;
      config["user"][id]["state"]["device"] = device;
      config["user"][id]["state"]["last-access"] = accessTime;
        config.update(config.user_root, config.user);
    //_____access-log update_____
      let newlog ={ accessTime, id, "userName": config["user"][id]["config"]["userName"], device };
      let log = config.readSync(config.access_log_root);
      log.unshift(newlog);
        config.update(config.access_log_root, log);
  }else {
      console.log("### no userID .../auth/issue\n\n");
      return res.status(401).json({error: 'Authorization failure - No user id'})
  }
})



// ============= @verify() => $store/VERIFY 

router.post('/verify', (req, res) => {
console.log("\n\n### initiating-verification ... /auth/verify");
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
  const {id} = req.body;
  if(config.user.hasOwnProperty(id)) {
    res.json(config["user"][id]["config"]);
    console.log("### config loaded .../auth/load-config");
  }else {
    console.log("### no userID .../auth/load-config");
    return res.status(404).json({error: 'No user id'})
  }
})



// ============= REFRESH METHODS
let deposit = { "id" : "accessToken" };

router.post('/deposit', (req, res) => {
  console.log(req.headers);
  const {id} = req.body;
  deposit[id] = req.headers.authorization;
    config["user"][id]["state"]["isOnline"] = false;
    config["user"][id]["state"]["device"] = "";
  setTimeout(clearDeposit, 1000, id);
  console.log("### token depositted .../auth/depoist\n");
})
router.post('/recover', (req, res) => {
  const {id} = req.body;
  const accessToken = deposit[id];
  res.json({accessToken});
    config["user"][id]["state"]["isOnline"] = true;
    config["user"][id]["state"]["device"] = req["headers"]["user-agent"];
})
function clearDeposit(id){
  delete deposit[id];
  config.update(config.user_root, config.user);
  console.log("### token deleted .../auth/depoist\n");
}



// ============= LOGOUT
router.post('/logout', (req, res) => {
  const {id} = req.body;
  config["user"][id]["state"]["isOnline"] = false;
  config["user"][id]["state"]["device"] = "";
  config.update(config.user_root, config.user);
  console.log("### LOGGED OUT .../auth/logout");
})



// ============= THEME CHANGER
router.post('/theme/change', (req, res) => {
  console.log(req.body);
  const {id, color} = req.body;
  config["user"][id]["config"]["colorConfig"] = color;
  config.update(config.user_root, config.user);
  res.json({color});
})



module.exports = router;