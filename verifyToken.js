
const jwt = require('jsonwebtoken');

// Verify Token
function verifyToken(req, res, next){
    // If there is no authorization header, return 401
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    // If the token is not there, return 401
    if (token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, `${process.env.JWT_SECRET}`);
    // If the token is unverified, return 401
    if (!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    // If the token is verified, continue with browser request
    next();
}

module.exports = {verifyToken};