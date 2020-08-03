const jwt = require('jsonwebtoken');
const { callbackify } = require('util');
const secret = 'token secret';
const secretKey = {
  1: "access-level-1",
  2: "access-level-2",
  3: "access-level-3"
}

function signToken(id, accessLevel, expiresIn) {
  return jwt.sign({id}, secretKey[accessLevel], {expiresIn})
}


function verify (token) {
  let result;

  result = jwt.verify(token, secretKey[1], (err, decoded)=>{
    if (err){
      return jwt.verify(token, secretKey[2], (err,decoded)=>{
        if (err){
          return jwt.verify(token, secretKey[3], (err,decoded)=>{
            if (err){
              return { "accessLevel": 0 , "msg": "Invalid Token" }
            }
            return { "accessLevel": 3 , "msg": "Authorized" }
          })
        }
        return { "accessLevel": 2 , "msg": "Authorized" }
      })
    }
    return { "accessLevel": 1 , "msg": "Authorized" }
  });

  return result;
}


module.exports.signToken = signToken;
module.exports.verify = verify;