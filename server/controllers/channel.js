module.exports.init = function(server) {
    server.get('/channel/{name}', (res, req) => {
        res.render('channel/details', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeChannelDetails: true,
            sidebar: 'channel',
            channelName: req.params.name,
            title: 'Channel Details - #' + req.params.name
        });
    });

    server.get('/channel/{name}/access', (req, res) => {
        res.rednder('channel/access', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeChannel: true,
            activeAccessList: true,
            sidebar: 'channel',
            channelName: req.params.name,
            title: 'Access List - #' + req.params.name
        });
    });

    server.get('/channel/{name}/akicks', (req, res) => {
        res.render('channel/list', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeChannel: true,
            activeAKickList: true,
            sidebar: 'channel',
            channelName: req.params.name,
            list: 'akicks',
            title: 'AKick List - #' + req.params.name
        });
    });

    server.get('/channel/{name}/quiets', (req, res) => {
        res.render('channel/list', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeChannel: true,
            activeQuietList: true,
            sidebar: 'channel',
            channelName: req.params.name,
            list: 'quiets',
            title: 'Quiets List - #' + req.params.name
        });
    });

    server.get('/channel/{name}/excepts', (res, req) => {
        res.render('channel/list', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeChannel: true,
            activeExceptList: true,
            sidebar: 'channel',
            channelName: req.params.name,
            list: 'excepts',
            title: 'Excepts List - #' + req.params.name
        });
    });

    server.get('/channel/{name}/invexes', (req, res) => {
        res.render('channel/list', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeChannel: true,
            activeInvexList: true,
            sidebar: 'channel',
            channelName: req.params.name,
            list: 'invexes',
            title: 'Invex List - #' + req.params.name
        });
    });
};
