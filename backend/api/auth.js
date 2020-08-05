const jwt = require('jsonwebtoken');
const { func } = require('joi');
const accessKey = {
  1: "access-level-1",
  2: "access-level-2",
  3: "access-level-3"
}

function signToken(user, clientKey, expiresIn) {
  let result = jwt.sign(user, clientKey, {expiresIn});
  console.log("~~~ Token Issued ~~~");
  return result
  
}


function verify (token, clientKey) {
  let result = jwt.verify(token, clientKey, (err, decoded) => {
    if(err) {
      return { "key": "", "accessLevel": 0 }
    }else {
      return decoded
    }
  });

  return result;
}


module.exports.signToken = signToken;
module.exports.verify = verify;