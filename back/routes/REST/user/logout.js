exports.get = function(req, resp) {
    console.log('чел удален');
    resp.send(200, {status: "ok"});
};