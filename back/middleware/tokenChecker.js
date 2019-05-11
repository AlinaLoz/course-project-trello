const jwt = require('jsonwebtoken');
const conf = require('../config/config');

const restAPITokenChecker = (req, resp, next) =>  {
    const token = req.cookies['token'];
    if (!token)  return resp.status(403).send({auth: false, token: null});
    jwt.verify(token, conf.token.secret, function (err, decode) {
        if (err) return resp.status(403).send({auth: false, message: 'authenticate token has expired' });
        req.id = decode.id;
        req.token = token;
        next();
    });
};

const socketTokenChecker = (socket, next) =>  {
    const [action, query] = socket;

    const token = Object.keys(query).length && query.token;
    if (!token) return next(new Error('Not a doge error'));

    jwt.verify(token, conf.token.secret, function (err, decode) {
        if (err)  return next(new Error('Not a doge error 2'));
        if (decode.id != query.id) return next(new Error('Not a doge error 3'));
        next();
    });
};

module.exports = {
    socket: (...props) => socketTokenChecker(...props),
    restAPI: (...props) => restAPITokenChecker(...props)
};

