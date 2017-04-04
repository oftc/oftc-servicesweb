module.exports.init = function(server) {
    server.get('/admin', (req, res) => {
        res.render('admin/index', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeAdmin: true,
            sidebar: 'admin',
            title: 'Admin'
        });
    });

    server.get('/admin/admins', (req, res) => {
        res.render('admin/admins', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeAdmin: true,
            activeAdminList: true,
            sidebar: 'admin',
            title: 'Admins List'
        });
    });

    server.route('/admin/akills', (req, res) => {
        reply.view('admin/akills', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeAdmin: true,
            activeAKillList: true,
            sidebar: 'admin',
            title: 'AKill List'
        });
    });
};
