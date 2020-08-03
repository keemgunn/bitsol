const jwt = require('jsonwebtoken');
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
  return jwt.verify(token, secret)
}











function ensureAuth () {
  return (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization) {
      res.status(401)
      throw Error('No Authorization headers')
    }
    
    try {
      req.user = this.verify(authorization)
    } catch (e) {
      res.status(401)
      throw e
    }

    next()
  }
}




module.exports.signToken = signToken;
module.exports.verify = verify;
module.exports.ensureAuth = ensureAuth;