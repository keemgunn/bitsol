const jwt = require('jsonwebtoken');
let hotKey = {"id":"requestPoint"};
// 다중로그인 방지... 마지막 로그인한 컴퓨터에서만 인증 가능

function signToken(auth, requestPoint, expiresIn) {
  hotKey[auth.id] = requestPoint;
  let result = jwt.sign(auth, requestPoint, {expiresIn});
  return result // return: token
}

function verify (token, id) {
  let result = jwt.verify(token, hotKey[id], (err, decoded) => {
    if(err) {
      return { "accessLevel": 0 }
    }else {
      return { "accessLevel": decoded.accessLevel }
    }
  }); return result;
}

module.exports.signToken = signToken;
module.exports.verify = verify;