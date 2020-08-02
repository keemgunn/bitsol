const jwt = require('jsonwebtoken');
const secret = 'token secret';
const expiresIn = 60 * 60 * 3 // 3 hours


function signToken(id) {
  return jwt.sign({id}, secret, {expiresIn})
}









module.exports.signToken = signToken;