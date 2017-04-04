module.exports = { 
    checkLoggedIn: function(req, res, next) {
        if(req.user) {
            return next();
        }

        res.redirect('/login');
    },

    checkLoggedInNoRedirect: function(req, res, next) {
        if(req.user) {
            return next();
        }

        res.boom.unauthorized();
    },

    isAdmin: function(req, res, next) {
        if(req.user && req.user.admin) {
            return next();
        }

        if(req.user) {
            res.boom.forbidden('Not an admin');
        }

        res.redirect('/login');
    }
}