const jwt = require('jsonwebtoken');
const secret = 'token secret';
const expiresIn = 60 * 60 * 3 // 3 hours


function signToken(id) {
  return jwt.sign({id}, secret, {expiresIn})
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

function verify (token) {
  return jwt.verify(token.replace(/^Bearer\s/, ''), secret)
}






module.exports.signToken = signToken;
module.exports.ensureAuth = ensureAuth;
module.exports.verify = verify;