const config = require('./config.js');
const controllers = require('./controllers');
const express = require('express');
const boom = require('express-boom');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const handlebars = require('express-handlebars');
const path = require('path');

const logger = require('./log.js');

app.use(session({ secret: 'supersupersecret', maxAge: null }));
app.use(passport.initialize());
app.use(passport.session());
app.use(boom());

passport.use(new LocalStrategy({ usernameField: 'nickname'}, (username, password, done) => {
    let nickname = {
        id: 12345 + '',
        nickname: 'test',
        email: 'test@example.com',
        admin: false
    };

    nickname.token = jwt.sign('test', config.tokenSecret);
    
    return done(null, nickname);

    // accountRepository.getByNick(req.body.nickname, (err, result) => {
    //     if(err) {
    //         return done(null, false, { message: 'A server error occured verifying your details'});
    //     }

    //     if(!result) {
    //         return done(null, false, { message: 'Invalid username or password' });
    //     }

    //     let shasum = crypto.createHash('sha1');
    //     shasum.update(req.body.password + result.salt);
    //     let hash = shasum.digest('hex').toUpperCase();

    //     if(hash !== result.password.toUpperCase()) {
    //         return done(null, false, { message: 'Invalid username or password' });
    //     }

    //     let nickname = {
    //         id: result.id + '',
    //         nickname: result.nick,
    //         email: result.email,
    //         admin: result.flag_admin
    //     };

    //     nickname.token = jwt.sign(nickname, config.tokenSecret);

    //     return done(null, nickname);
    // });    
}));
passport.serializeUser((user, done) => {
    if(user) {
        done(null, user.id);
    }
});
passport.deserializeUser((id, done) => {
    let nickname = {
        id: 12345 + '',
        nickname: 'test',
        email: 'test@example.com',
        admin: false
    };

    nickname.token = jwt.sign('test', config.tokenSecret);
    
    return done(null, nickname);    
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let handlebarsInstance = handlebars.create({
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, '../client/views/layout'),
    partialsDir: path.join(__dirname, '../client/views/partials')
});

app.set('views', path.join(__dirname, '../client/views'));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/../public'));

controllers.init(app);

let port = process.env.NODE_ENV !== 'production' ? 4000 : process.env.PORT;

app.listen(port, '0.0.0.0', function onStart(err) {
    if(err) {
        logger.error(err);
    }

    logger.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

app.get('/', (req, res) => {
    res.render('index', {
        authenticated: !!req.user,
        admin: req.user && req.user.admin,
        activeHome: true,
        title: 'Home'
    });
});
