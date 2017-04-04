const accountRepository = require('../../accountrepository.js');
const channelRepository = require('../../channelrepository.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const requestjs = require('request');
const config = require('../../config.js');

function accountLogin(req, res) {
    let nickname = {
        id: 12345 + '',
        nickname: 'test',
        email: 'test@example.com',
        admin: false
    };

    nickname.token = jwt.sign('test', config.tokenSecret);

    res.cookie('authToken', nickname.token);
    res.send(nickname);

    // accountRepository.getByNick(req.body.nickname, (err, result) => {
    //     if(err) {
    //         return res.send({ error: 'A server error occured verifying your details'});
    //     }

    //     if(!result) {
    //         return res.send({ error: 'Invalid username or password' });
    //     }

    //     let shasum = crypto.createHash('sha1');
    //     shasum.update(req.body.password + result.salt);
    //     let hash = shasum.digest('hex').toUpperCase();

    //     if(hash !== result.password.toUpperCase()) {
    //         return res.send({ error: 'Invalid username or password' });
    //     }

    //     let nickname = {
    //         id: result.id + '',
    //         nickname: result.nick,
    //         email: result.email,
    //         admin: result.flag_admin
    //     };

    //     nickname.token = jwt.sign(nickname, config.tokenSecret);

    //     res.send(nickname);
    //     res.cookie('authToken', nickname.token);
    // });
}

function accountGet(req, res) {
    let id = req.user.id;

    accountRepository.getById(id, function(result) {
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
    server.post('/api/login', accountLogin);
    server.get('/api/account/{id?}', accountGet);
    server.get('/api/account/nicknames/{id?}', accountNicknames);
    server.get('/api/account/certificates/{id?}', accountCertificates);
    server.get('/api/account/channels/{id?}', accountChannels);
    server.post('/api/account/verify', accountVerify);
};
