const jwt = require('jsonwebtoken');
let hotKey = {"userKey":"requestPoint"};

function signToken(auth, requestPoint, expiresIn) {
  hotKey[auth.key] = requestPoint;
  let result = jwt.sign(auth, requestPoint, {expiresIn});
  console.log("~~~ Token Issued ~~~");
  return result
}

function verify (token, userKey) {
  let clientKey = hotKey[userKey];
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