module.exports.init = function(server) {
    server.get('/nickname/{name}', (req, res) => {
        res.render('nickname/details', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeNickname: true,
            nickname: req.params.name,
            title: 'Nickname result'
        });
    });

    server.get('/nickname', (req, res) => {
        res.render('nickname/index', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeNickname: true,
            nickname: req.params.name,
            title: 'Nickname search'
        });
    });
};
