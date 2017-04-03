const config = require('./config.js');
const controllers = require('./controllers');
const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const handlebars = require('express-handlebars');
const path = require('path');

const logger = require('./log.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let handlebarsInstance = handlebars.create({
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, '../client/views/layout'),
    partialsPath: path.join(__dirname, '../client/views/partials')
});

app.set('views', path.join(__dirname, '../client/views'));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

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
