const jwt = require('jsonwebtoken');
const conf = require('../config/config');

module.exports = function (req, resp, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)  return resp.status(403).send({auth: false, token: null});

    jwt.verify(token, conf.token.secret, function (err, decode) {
        if (err) return resp.status(403).send({auth: false, message: 'authenticate token has expired' });
        req.id = decode.id;
        req.token = token;
        next();
    });
};