const jwt = require('jsonwebtoken');

module.exports = function(userData){
    
    const token = jwt.sign({user : userData, exp: Math.floor(Date.now() / 1000) + (60 * 60)},process.env.JWT_KEY);
  

    return token;
}