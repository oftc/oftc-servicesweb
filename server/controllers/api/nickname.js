const nicknameRepository = require('../../nicknamerepository.js');

function nicknameGet(req, res) {
    nicknameRepository.getByName(req.params.name, function(err, result) {
        if(err) {
            return res.boom.badImplementation('A server error occured');
        }   
        
        if(!result) {
            return res.boom.notFound();
        }

        if((req.user && req.user.admin) || !result.flag_private) {
            let nick = {
                nick: result.nick,
                lastHost: result.last_host,
                lastRealname: result.last_realname,
                lastQuitMessage: result.last_quit_msg,
                lastQuitTime: result.last_quit_time,
                regTime: result.reg_time,
                email: result.email
            };

            return res.send(nick);
        }

        return res.boom.notFound();
    });
}

module.exports.init = function(server) {
    server.get('/api/nickname/:name', nicknameGet);
};
