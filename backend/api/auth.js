const jwt = require('jsonwebtoken');
let hotKey = {"userKey":"requestPoint"};
// 다중로그인 방지... 마지막 로그인한 컴퓨터에서만 인증 가능

function signToken(auth, requestPoint, expiresIn) {
  hotKey[auth.key] = requestPoint;
  let result = jwt.sign(auth, requestPoint, {expiresIn});
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