const config = require('../config.js');

module.exports.init = function(server) {
    server.get('/login', (req, res) => {
        res.render('login', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeLogin: true,
            title: 'Login'
        });
    });

    server.get('/logout', (req, res) => {
        res.cookie('authToken', '', { expries: new Date() });

        return res.redirect('/');
    });

    server.get('/account', (req, res) => {
        res.render('account/details', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeAccount: true,
            activeDetails: true,
            sidebar: 'account',
            title: 'Account Details'
        });
    });

    server.get('/account/nicknames',(req, res) => {
        res.render('account/nicknames', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeAccount: true,
            activeNicknames: true,
            sidebar: 'account',
            title: 'Linked Nicknames'
        });
    });

    server.get('/account/certificates', (req, res) => {
        res.render('account/certificates', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeAccount: true,
            activeCertificates: true,
            sidebar: 'account',
            title: 'SSL Certificates'
        });
    });

    server.get('/account/channels', (req, res) => {
        res.render('account/channels', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeAccount: true,
            activeChannels: true,
            sidebar: 'account',
            title: 'Channels'
        });
    });

    server.get('/account/verify', (req, res) => {
        res.render('account/verify', {
            authenticated: !!req.user,
            admin: req.user && req.user.admin,
            activeAccount: true,
            activeVerify: true,
            recaptchaSitekey: config.recaptcha_sitekey,
            sidebar: 'account',
            title: 'Account Verification'
        });
    });
};
