module.exports = {
    listen: {
        host: '127.0.0.1',
        port: 8000,
    },
    connectionString: {
        user:     'ircservices',  // env var: PGUSER
        database: 'ircservices',  // env var: PGDATABASE
        password: 'ircservices',  // env var: PGPASSWORD
        port:     5432,           // env var: PGPORT
        max:      10,             // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    },
    tokenSecret: 'foobar',
    recaptcha_sitekey: '6Lxxx',
    recaptcha_secretkey: '6Lyyy',
}
