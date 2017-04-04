var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var LESS_DIR = path.resolve(__dirname, 'client/content');

var config = {
    devtool: 'inline-source-map',
    entry: [
        // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000',
        // 'webpack/hot/only-dev-server',
        path.join(__dirname, 'client/scripts/index.js'),
        LESS_DIR + '/site.less'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        contentBase: BUILD_DIR,
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
            jQuery: 'jquery'
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
