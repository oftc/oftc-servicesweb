const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const LESS_DIR = path.resolve(__dirname, 'client/content');

let config = {
    devtool: 'inline-source-map',
    entry: {
        root: [
            LESS_DIR + '/site.less',
            path.join(__dirname, 'client/scripts/index.js')
        ],
        accountCertificates: path.join(__dirname, 'client/scripts/account/certificates.js'),
        accountChannels: path.join(__dirname, 'client/scripts/account/channels.js'),
        accountDetails: path.join(__dirname, 'client/scripts/account/details.js'),
        accountNicknames: path.join(__dirname, 'client/scripts/account/nicknames.js'),
        accountVerify: path.join(__dirname, 'client/scripts/account/verify.js'),
        nickname: path.join(__dirname, 'client/scripts/nickname/index.js'),
        nicknameDetails: path.join(__dirname, 'client/scripts/nickname/details.js'),
        login: path.join(__dirname, 'client/scripts/login.js')
    },
    output: {
        path: BUILD_DIR,
        filename: '[name]-bundle.js',
        publicPath: '/'
    }, 
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': JSON.stringify('true')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            moment: 'moment'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.json?/,
                loader: 'json-loader'
            },
            {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, 
                loader: 'url-loader?limit=100000'
            }]
    }
};

module.exports = config;
