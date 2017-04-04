const accountRepository = require('../../accountrepository.js');
const channelRepository = require('../../channelrepository.js');
const jwt = require('jsonwebtoken');
const requestjs = require('request');
const passport = require('passport');

const config = require('../../config.js');
const checkLoggedInNoRedirect = require('../../auth-middleware.js').checkLoggedInNoRedirect;

function accountGet(req, res) {
    let id = req.user.id;

    accountRepository.getById(id, function(err, result) {
        if(err) {
            return res.boom.badImplementation('Database error');
        }

        if(!result) {
            return res.boom.notFound();
        }

        return res.send({
            primary_nickname: result.primary_nickname,
            cloak: result.cloak,
            email: result.email,
            url: result.url,
            lastHost: result.last_host,
            lastQuitMessage: result.last_quit_msg,
            lastQuitTime: result.last_quit_time,
            lastRealname: result.last_realname,
            enforce: result.flag_enforce,
            secure: result.flag_secure,
            cloakEnabled: result.flag_cloak_enabled,
            verified: result.flag_verified,
            private: result.flag_private,
            regTime: result.reg_time
        });
    });
}

function accountNicknames(req, res) {
    accountRepository.getNicknames(req.user.id, function(result) {
        res.send(result);
    });
}

function accountCertificates(req, res) {
    accountRepository.getCertificates(req.user.id, function(result) {
        res.send(result);
    });
}

function accountChannels(req, res) {
    channelRepository.getChannelsForAccount(req.user.id, function(result) {
        res.send(result);
    });
}

function accountVerify(req, res) {
    let id = req.user.id;

    requestjs.post('https://www.google.com/recaptcha/api/siteverify', { 
        form: {
            secret: config.recaptcha_secretkey,
            response: req.body.response
        }
    },
    function(err, httpresponse, body) {
        if(err || httpresponse.statusCode !== 200) {
            res.send({ verified: false });
            return;
        }
        
        let info = JSON.parse(body);
        if(!info.success) {
            res.send({ verified: false });
            return;
        }
        
        accountRepository.accountSetVerified(id);
        res.send({ verified: true });
    });
}

module.exports.init = function(server) {
    server.post('/api/login', passport.authenticate('local'), function(req, res) {
        res.send({ success: true, user: req.user, token: jwt.sign(req.user, config.tokenSecret) });
    });
    server.get('/api/account', checkLoggedInNoRedirect, accountGet);
    server.get('/api/account/nicknames/{id?}', checkLoggedInNoRedirect, accountNicknames);
    server.get('/api/account/certificates/{id?}', checkLoggedInNoRedirect, accountCertificates);
    server.get('/api/account/channels/{id?}', checkLoggedInNoRedirect, accountChannels);
    server.post('/api/account/verify', checkLoggedInNoRedirect, accountVerify);
};
